import { Request, Response } from "express";
import { BaseController } from "../../Base/Base_Class/Base.controller";
import { ApiResponse } from "../../Base/Base_Class/response";
import { Booking, CommissionModel, LikeList, Notification, WithdawModel } from "../../Base/Base_Model/common_Model";
import { addWallet, User, UserModel } from "./user.model";
import { addMoneyService, bookingService, checkOutService, LikeService, notificationService, UserServics } from "./user.service";
import { MerchantPayment, MerchantPaymentModel } from "../Merchant/merchant.model";
import { PaymentStatus } from "../../Base/Base_Class/baseEnum";

export class userController extends BaseController<User> {
    constructor() {
        super(new UserServics)
    }
}

export class likeController extends BaseController<LikeList> {
    constructor() {
        super(new LikeService)
        this.haldelGetLikeList = this.haldelGetLikeList.bind(this)
    }

    async haldelGetLikeList(req: Request, res: Response) {
        try {
            const service = this.service as LikeService;
            const { _id } = req.query;
            const data = await service.getLikeByUser(_id);
            ApiResponse.success(res, "Found", data);
        } catch (error: any) {
            ApiResponse.error(res, "Image adding failed", 500, error.message);
        }
    }
}


export class notificationController extends BaseController<Notification> {
    constructor() {
        super(new notificationService);
        this.handelMarkAsRead = this.handelMarkAsRead.bind(this);
        this.handelGetAllNotification = this.handelGetAllNotification.bind(this);
        this.handelMarkReadAsAll = this.handelMarkReadAsAll.bind(this);
        this.hadelDeleteAllNotification = this.hadelDeleteAllNotification.bind(this)
    }

    async handelMarkAsRead(req: Request, res: Response) {
        try {
            const service = this.service as notificationService;
            const { _id } = req.query;
            const data = await service.markRead(_id);
            ApiResponse.success(res, "read as a Mark", data);
        } catch (error: any) {
            ApiResponse.error(res, "Image adding failed", 500, error.message);
        }
    }

    async handelGetAllNotification(req: Request, res: Response) {
        try {
            const service = this.service as notificationService;
            const { _id } = req.query;
            const data = await service.getAllNotification(_id);
            ApiResponse.success(res, "Sucessfully fettched", data);
        } catch (error: any) {
            ApiResponse.error(res, "Image adding failed", 500, error.message);
        }
    }
    async handelMarkReadAsAll(req: Request, res: Response) {
        try {
            const service = this.service as notificationService;
            const { _id } = req.query;
            const data = await service.markReadAsAll(_id);
            ApiResponse.success(res, "Mark all as a read True", data);
        } catch (error: any) {
            ApiResponse.error(res, "Image adding failed", 500, error.message);
        }
    }

    async hadelDeleteAllNotification(req: Request, res: Response) {
        try {
            const service = this.service as notificationService;
            const { _id } = req.query;
            const data = await service.deleteAllNotification(_id);
            ApiResponse.success(res, "All Notification Deleted", data);
        } catch (error: any) {
            ApiResponse.error(res, "Image adding failed", 500, error.message);
        }
    }
}

export class bookingController extends BaseController<Booking> {
    constructor() {
        super(new bookingService)
        this.handelBooking = this.handelBooking.bind(this);
    }

    async handelBooking(req: Request, res: Response) {
        try {
            const service = this.service as bookingService;
            const { userId, roomId, duration, startDate } = req.body;
            const data = await service.bookingCreate(userId, roomId, duration, startDate);
            ApiResponse.success(res, "Booking successfull", data);
        } catch (error: any) {
            ApiResponse.error(res, error.message)
            console.log(error);
        }
    }
}


export class CheckOutController extends BaseController<MerchantPayment> {
    constructor() {
        super(new checkOutService)
        this.handelCheckOut = this.handelCheckOut.bind(this)
    }

    async handelCheckOut(req: Request, res: Response) {
        try {

            const service = this.service as checkOutService;
            const { _id } = req.query;
            const data = await service.checkOut(_id);
            ApiResponse.success(res, "Payment Sended", data);
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

export class addMoneyController extends BaseController<addWallet> {
    constructor() {
        super(new addMoneyService)
        this.handelAddMoney = this.handelAddMoney.bind(this)
    }

    async handelAddMoney(req: Request, res: Response) {
        try {
            const service = this.service as addMoneyService;
            const data = await service.addMoneyToWallet(req.body);
            ApiResponse.success(res, "Money added", data);
        } catch (error: any) {
            ApiResponse.error(res, error.message);
        }
    }
}

export const refund = async (req: Request, res: Response) => {
    try {
        const { _id } = req.query;
        const paymentData = await MerchantPaymentModel.findById(_id);
        if (paymentData?.status === PaymentStatus.RECIVED) {
            paymentData.status = PaymentStatus.REFUND;
            await paymentData?.save();
            await UserModel.findByIdAndUpdate(paymentData.userId, { $inc: { wallet: paymentData.amount } }, { new: true });
            ApiResponse.success(res, "Payment Refunded")
        }
        else {
            paymentData?.status === PaymentStatus.SEND ? ApiResponse.error(res, `Payment Already send into Merchant Account`) :
                ApiResponse.error(res, "Payment Already Refunded ")
        }
    } catch (error: any) {
        ApiResponse.error(res, error)
    }
}

 export const createWithdraw = async(req: Request, res: Response)=>{
    try {
      const { userId, amount } = req.body;

      if (!userId || !amount) {
        return ApiResponse.error(res, "Missing required fields", 400);
      }

      const user = await UserModel.findById(userId);
      if (!user) {
        return ApiResponse.error(res, "User not found", 404);
      }

      if (user.wallet < amount) {
        return ApiResponse.error(res, "Insufficient wallet balance", 400);
      }

      user.wallet -= amount;
      await user.save();

      const withdraw = await WithdawModel.create({
        user: user._id,
        amount: amount
      });

      await withdraw.save();

      return ApiResponse.success(res, "Withdraw request created successfully", withdraw);

    } catch (error: any) {
      console.log(error);
      return ApiResponse.error(res, "Failed to create withdraw request", 500);
    }
  }

  