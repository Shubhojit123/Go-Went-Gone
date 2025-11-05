import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import {Address,PropertyVerification,BankDetails, IGeoLocation} from "../../Base/Base_Model/commonSchema"
import {PaymentStatus, PROPERTYSTATUS} from "../../Base/Base_Class/baseEnum"
import { User } from "../User/user.model";
import { Room } from "./room.model";
import mongoose, { Date } from "mongoose";
@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'property',
  },
})


export class Property{
    @prop({required:true})
    name!: string

    @prop ({required:true,type:Address})
    address!: Address

    @prop ({required:true,ref:()=> User,  type:()=>mongoose.Types.ObjectId})
    owner!: Ref<User>

    @prop ({default:PROPERTYSTATUS.CLOSE,enum:PROPERTYSTATUS})
    status !: string

    @prop ({default:false})
    verification !: boolean

    @prop({ type:  IGeoLocation })
    geoLocation?: IGeoLocation;

    @prop ({type : PropertyVerification})
    VerificationDetails !: PropertyVerification

    @prop ({type:BankDetails})
    BankDetails !: BankDetails

    @prop({ref:()=> Room , type:()=>[mongoose.Types.ObjectId]})
    rooms !: Ref<Room>[]

    @prop({default:0})
    wallet !: number

}

export const PropertyModel = getModelForClass(Property);



@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "merchantPayment"
  }
})

export class MerchantPayment {
    @prop({required:true,ref:()=>User,type:()=> mongoose.Types.ObjectId})
    userId !: Ref<User>

    @prop({required:true,ref:()=>Room,type:()=> mongoose.Types.ObjectId})
    room !: Ref<Room>

    @prop({required:true,ref:()=>Property,type:()=> mongoose.Types.ObjectId})
    property !: Ref<Property>

    @prop({required:true})
    payableAmount !: number

    @prop({required:true})
    amount !: number

    @prop({required:true})
    paymentDate !: Date

    @prop({required:true,enum:Object.values(PaymentStatus),default:PaymentStatus.NOT_RECIVED})
    status !: PaymentStatus

}

export const MerchantPaymentModel = getModelForClass(MerchantPayment);