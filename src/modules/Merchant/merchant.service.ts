import { Document, Types } from "mongoose";
import { BaseService } from "../../Base/Base_Class/Base.service";
import { Property, PropertyModel } from "./merchant.model";
import { Room, RoomModel } from "./room.model";
import { ApiResponse } from "../../Base/Base_Class/response";

export class propertyServics extends BaseService<Property> {
    constructor() {
        super(PropertyModel)
    }
}

export class roomServics extends BaseService<Room> {
    constructor() {
        super(RoomModel)
    }

    async handelCreateRoom(data: Partial<Room>) {
        try {
            const createRoom = await this.model.create(data);
            await PropertyModel.findByIdAndUpdate(data.property, { $push: { rooms: createRoom._id } }, { new: true });
            return createRoom;
        } catch (error: any) {
            console.log(error);
        }
    }
    async addImage(data: Partial<Room>) {
        try {
            const id  = data.roomId;
            const res = await RoomModel.findByIdAndUpdate(id,{ $push: { images: { $each: data.images! } } }, { new: true });
            return res;
        } catch (error: any) {
            console.log(error)
        }
    }
}