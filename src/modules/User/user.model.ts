import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { NameModel, IGeoLocation, Address, ContactInfo } from "../../Base/Base_Model/commonSchema"
import { AddMoney, USERROLE } from "../../Base/Base_Class/baseEnum"
import mongoose from "mongoose";


@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'users',
  },
})

export class User {
  @prop({ required: true, _id: false,type: NameModel })
  name!: NameModel;

  @prop({ required: true, unique: true, trim: true })
  email!: string;

  @prop({ required: true, trim: true })
  password!: string;

  @prop({ type: ContactInfo })
  contactInfo?: ContactInfo;

  @prop({ type: Address })
  address?: Address;

  @prop({ type:  IGeoLocation })
  geoLocation?: IGeoLocation;

  @prop({ required: true, enum: Object.values(USERROLE), default: USERROLE.USER })
  role!: USERROLE;

  @prop({ type: () => String })
  refershToken?: string;

  @prop({default:0})
  wallet !: number

}

export const UserModel = getModelForClass(User);

@modelOptions({
  schemaOptions:{
    collection:"addMoney",
    timestamps:true
  }
})

export class addWallet{
    @prop({required:true,type:()=> mongoose.Types.ObjectId,ref:()=>User})
    userId !: Ref<User>

    @prop({required:true})
    amount !: number

    @prop({required:true})
    transectionId !: string

    @prop({required:true})
    method !: string

    @prop({required:true})
    transectionDetails !: string

    @prop({required:true,enum:Object.values(AddMoney),default:AddMoney.NOT_RECIVED})
    status !: AddMoney

}

export const AddWalletModel = getModelForClass(addWallet)