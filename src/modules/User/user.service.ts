import mongoose from "mongoose";
import { BaseService } from "../../Base/Base_Class/Base.service";
import { AddMoney, PaymentStatus } from "../../Base/Base_Class/baseEnum";
import { ApiResponse } from "../../Base/Base_Class/response";
import { Booking, BookingHistory, BookingHistoryModel, BookingModel, CommissionModel, LikeList, LikeListModel, Notification, NotificationModel, PaymentModel, TotalBookingAmountModel } from "../../Base/Base_Model/common_Model";
import { RoomModel } from "../Merchant/room.model";
import { addWallet, AddWalletModel, User, UserModel } from "./user.model";
import { MerchantPayment, MerchantPaymentModel, PropertyModel } from "../Merchant/merchant.model";

export class UserServics extends BaseService<User> {
    constructor() {
        super(UserModel)
    }
}

export class LikeService extends BaseService<LikeList> {
    constructor() {
        super(LikeListModel)
    }

    async getLikeByUser(id: any) {
        try {
            const data = await LikeListModel.find({ user: id });
            return data;
        } catch (error) {
            console.log(error)
        }
    }
}

export class notificationService extends BaseService<Notification> {
    constructor() {
        super(NotificationModel)
    }
    async markRead(id: any) {
        try {
            const res = await NotificationModel.findByIdAndUpdate(id, { read: true }, { new: true });
            return res;
        } catch (error) {
            console.log(error);
            return
        }
    }
    async markReadAsAll(id: any) {
        try {
            const res = await NotificationModel.updateMany({ user: id, read: false }, { $set: { read: true } });
            return res;
        } catch (error) {
            console.log(error);
            return;
        }
    }
    async getAllNotification(id: any) {
        try {
            const res = await NotificationModel.find({ user: id }, { new: true });
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAllNotification(id: any) {
        try {
            const res = await NotificationModel.deleteMany({ user: id });
            return res;
        } catch (error) {
            console.log(error)
        }
    }
}

export class bookingService extends BaseService<Booking> {
    constructor() {
        super(BookingModel)
    }

async bookingCreate(userId: string, roomId: string, duration: number, startDateI: Date) {
        try {
            if (!userId || !roomId || !duration) {
                throw new Error("Missing required parameters");
            }

            if (duration <= 0) {
                throw new Error("Duration must be greater than 0");
            }

            const room = await RoomModel.findById(roomId);
            if (!room) {
                throw new Error("Room not found");
            }

            if (room.isAvalabile === false) {
                throw new Error("Room not available");
            }

            const price = room.price * duration;

            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }

            if (user.wallet < price) {
                throw new Error("Insufficient wallet balance");
            }

            await UserModel.findByIdAndUpdate(
                user._id,
                { $inc: { wallet: -price } },
                { new: true }
            );

            const start = new Date(startDateI);
            const end = new Date(start);
            end.setDate(start.getDate() + duration - 1);

            const payment = await PaymentModel.create({
                transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                user: userId,
                room: roomId,
                amount: price,
                paymentStatus: PaymentStatus.RECIVED
            });

            const booking = await BookingModel.create({
                user: userId,
                room: roomId,
                price,
                duration,
                startDate: start,
                endDate: end,
                Payment: [payment._id]
            });
            const payableAmount = price - price * 0.15;

            await MerchantPaymentModel.create({
                userId: userId,
                room: roomId,
                property: room.property,
                amount: price,
                payableAmount: payableAmount,
                paymentDate: new Date(),
                status: PaymentStatus.RECIVED
            });


            await BookingHistoryModel.create({
                user: userId,
                room: roomId,
                payment: payment._id
            });

            await TotalBookingAmountModel.create({
                user: userId,
                room: roomId,
                amount: price
            });

            room.isAvalabile = false;
            room.Booking = room.Booking || [];
            room.Booking.push(booking._id);
            await room.save();

            return {
                booking,
                payment
            };
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Booking failed: ${error.message}`);
            }
            throw new Error("Booking failed: Unknown error");
        }
    }

}

export class addMoneyService extends BaseService<addWallet> {
    constructor() {
        super(AddWalletModel)
    }

    async addMoneyToWallet(data: Partial<AddMoney>) {
        try {
            const user = await UserModel.findById(data.userId);
            if (!user) {
                return "User Not found";
            }

            const isPayment = true;
            const transectionId = Math.random() * 100000 + 999999;
            if (isPayment) {
                const addMoney = await AddWalletModel.create({
                    userId: user._id,
                    amount: data.amount,
                    transectionId: transectionId,
                    method: data.method,
                    transectionDetails: data.transectionDetails,
                    status: AddMoney.RECIVED
                });

                const addSucessfully = await addMoney.save();
                await UserModel.findByIdAndUpdate(user._id, { $inc: { wallet: addMoney.amount } }, { new: true });
                return addSucessfully;
            }

        } catch (error) {
            console.log(error)
            return error;
        }
    }
}

export class checkOutService extends BaseService<MerchantPayment>{
    constructor()
    {
        super(MerchantPaymentModel)
    }

    async checkOut(id:any)
    {
        try {
             const merchantPaymentData = await MerchantPaymentModel.findById(id);
                        if (!merchantPaymentData) {
                            return "Payment not exist"
                        }
            
                        const commissionAmount = merchantPaymentData.amount - merchantPaymentData.payableAmount;
            
                        const commission = await CommissionModel.create({
                            user: merchantPaymentData.userId,
                            property: merchantPaymentData.property,
                            room: merchantPaymentData.room,
                            amount: commissionAmount
                        });
            
                        merchantPaymentData.status = PaymentStatus.SEND
                        await merchantPaymentData.save();

                        await PropertyModel.findByIdAndUpdate(merchantPaymentData.property,{ $inc: { wallet: merchantPaymentData.payableAmount } }, { new: true })
                        await RoomModel.findByIdAndUpdate(merchantPaymentData.room,{isAvalabile:true},{new:true})
                        return commission
        } catch (error) {
            console.log(error)
            throw  error;
        }
    }
}

