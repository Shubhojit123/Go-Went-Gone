import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { ServiceProvided } from "../../Base/Base_Class/baseEnum";
import { review } from "../../Base/Base_Model/commonSchema";
import { Property } from "./merchant.model";
import mongoose from "mongoose";
import { Booking } from "../../Base/Base_Model/common_Model";

@modelOptions({
    schemaOptions: {
        timestamps: true,
        collection: 'room',
    },
})


export class Room {
    @prop({ required: true, ref: () => Property , type: () => mongoose.Types.ObjectId })
    property !: Ref<Property>

    @prop({ required: true })
    roomName !: string

    @prop({ required: true })
    title !: string

    @prop({required:true})
    roomNo !: string

    @prop({ required: true })
    description !: string

    @prop({required:true})
    price !: number

    @prop({ default: [] })
    images!: string[];

    @prop({ type:  [String], enum: Object.values(ServiceProvided),default : [] })
    services!: ServiceProvided[];

    @prop({required:true})
    tag !: string

    @prop({required:true})
    mapLocation !: string

    @prop({type:()=> [review]})
    review !: review[]

    @prop({default:true})
    isAvalabile !: boolean

    @prop({ref:()=>Booking , type:()=> [mongoose.Types.ObjectId]})
    Booking !: Ref<Booking>[]

}

export const RoomModel = getModelForClass(Room)