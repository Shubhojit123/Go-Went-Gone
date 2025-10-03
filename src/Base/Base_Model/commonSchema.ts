import { modelOptions, prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

@modelOptions({ schemaOptions: { _id: false } })
export class NameModel {
 @prop({ required: true })
  first!: string;

  @prop({ required: true })
  last!: string;
}

@modelOptions({ schemaOptions: { _id: false } })
export class IGeoLocation {
  @prop({ required: true})
  lat!: number;

  @prop({ required: true })
  lng!: number;

  @prop({ required: true})
  ip!: string
}


@modelOptions({ schemaOptions: { _id: false } })
export class Address {
  @prop({  trim: true })
  addressLine?: string;

  @prop({ trim: true })
  city?: string;

  @prop({  trim: true })
  state?: string;

  @prop({ trim: true })
  country?: string;

  @prop({ trim: true })
  postalCode?: string;

}


@modelOptions({ schemaOptions: { _id: false } })
export class ContactInfo {
  @prop({required: true })
  phone!: string;

  @prop({ required: true })
  email!: string;

  @prop({required:true})
  emergencyContact?: string;
}


@modelOptions({ schemaOptions: { _id: false } })
export class PropertyVerification {
  @prop({ required: true})
  pan !: string

  @prop({ required: true})
  propertyDetails!: string

  @prop({ default: false})
  verification !: boolean
}

@modelOptions({ schemaOptions: { _id: false } })
export class BankDetails {
  @prop({ required:true })
  bankName !: string

  @prop({required:true })
  AccountHoldername !: string

  @prop({ required:true })
  accountNumber !: Number

  @prop({ required:true})
  IFSC !: string

  @prop({ default: false })
  verfication !: boolean

}

export class review {
  @prop({ type: () => mongoose.Types.ObjectId })
  user !: mongoose.Types.ObjectId

  @prop({ type: String })
  comment !: mongoose.Types.ObjectId

  @prop({ type: () => Number })
  rating !: number

}

export class UserDocument {
  @prop({ type: () => String })
  document !: string
}
 