import { getModelForClass, index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "../../modules/User/user.model";
import { Room } from "../../modules/Merchant/room.model";
import mongoose from "mongoose";
import type { Date } from "mongoose";
import { UserDocument } from "./commonSchema";
import { CommissionType, PaymentStatus } from "../Base_Class/baseEnum";
import { Property } from "../../modules/Merchant/merchant.model";
@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'Booking',
  },
})

export class Booking {
  @prop({ required: true, ref: User, type: () => mongoose.Types.ObjectId })
  user !: Ref<User>

  @prop({ required: true })
  startDate!: Date;

  @prop({ required: true })
  endDate!: Date;

  @prop({ required: true, })
  price !: number

  @prop({ required: true, ref: () => Room, type: () => mongoose.Types.ObjectId })
  room !: Ref<Room>

  @prop({ type: () => [UserDocument] })
  UserDocument !: UserDocument[]

  @prop({ required: true, default: 1, })
  duration !: number


  @prop({ type: () => [mongoose.Types.ObjectId], ref: () => Payment })
  Payment !: Ref<Payment>[]

}

export const BookingModel = getModelForClass(Booking);


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'Payment',
  },
})


export class Payment {

  @prop({ required: true, ref: () => User, type: () => mongoose.Types.ObjectId })
  user !: Ref<User>

  @prop({ required: true, ref: () => Room, type: () => mongoose.Types.ObjectId })
  room !: Ref<Room>

  @prop({ required: true })
  amount !: number

  @prop({ required: true, type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.NOT_RECIVED })
  paymentStatus!: PaymentStatus;

}

export const PaymentModel = getModelForClass(Payment);


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'OTP'
  }
})

export class OTP {
  @prop({ type: () => mongoose.Types.ObjectId, ref: () => User })
  user !: Ref<User>

  @prop({ type: () => String })
  otp !: string

  @prop({ type: () => Date })
  expire !: Date
}

export const OtpModel = getModelForClass(OTP)


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'BookingHistory'
  }
})

export class BookingHistory {
  @prop({ type: () => mongoose.Types.ObjectId, ref: () => User })
  user !: Ref<User>

  @prop({ type: () => mongoose.Types.ObjectId, ref: () => Room })
  room !: Ref<Room>

  @prop({ type: () => mongoose.Types.ObjectId, ref: () => Payment })
  payment !: Ref<Payment>
}

export const BookingHistoryModel = getModelForClass(BookingHistory);


@index({ user: 1, room: 1 }, { unique: true })

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'LikeList'
  }
})

export class LikeList {
  @prop({ type: () => mongoose.Types.ObjectId, ref: () => User })
  user !: Ref<User>

  @prop({ type: () => mongoose.Types.ObjectId, ref: () => Room })
  room !: Ref<Room>
}

export const LikeListModel = getModelForClass(LikeList);

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "Notification"
  }
})

export class Notification {
  @prop({ type: () => mongoose.Types.ObjectId, ref: () => User })
  user !: Ref<User>

  @prop({ required: true })
  title !: string

  @prop({ default: false })
  read !: boolean
}

export const NotificationModel = getModelForClass(Notification);


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "TotalBookingAmount"
  }
})
export class TotalBookingAmount {
  @prop({ type: () => mongoose.Types.ObjectId, ref: () => User })
  user !: Ref<User>

  @prop({ type: () => mongoose.Types.ObjectId, ref: () => Room })
  room !: Ref<Room>

  @prop({required:true})
  amount !: number
}

export const TotalBookingAmountModel = getModelForClass(TotalBookingAmount);


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "commission"
  }
})

export class Commission{

  @prop({required:true,ref:()=>User,type:()=> mongoose.Types.ObjectId})
  user !: Ref<User>

  @prop({required:true,ref:()=>Property,type:()=> mongoose.Types.ObjectId})
  property !: Ref<Property>

  @prop({ref:()=>Room,type:()=> mongoose.Types.ObjectId})
  room !: Ref<Room>

  @prop({enum:Object.values(CommissionType),default:CommissionType.RENT})
  commission !: CommissionType

  @prop({required:true})
  amount !: number

}

export const CommissionModel = getModelForClass(Commission)


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "withdraw"
  }
})
export class withdraw{
    @prop({required:true,ref:()=>User,type:()=> mongoose.Types.ObjectId})
    user !: Ref<User>

    @prop({required:true})
    amount !: number
}

export const WithdawModel = getModelForClass(withdraw);