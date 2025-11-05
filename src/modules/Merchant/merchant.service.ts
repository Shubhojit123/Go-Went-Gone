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

    async handleCreateRoom(data: Partial<Room>) {
        if (!data.property) {
            console.log(data)
            throw new Error("Property ID is required");
        }
        if (!Types.ObjectId.isValid(data.property.toString())) {
            throw new Error("Invalid Property ID");
        }

        try {
            const createRoom = await this.model.create(data);
            const updatedProperty = await PropertyModel.findByIdAndUpdate(
                data.property,
                { $push: { rooms: createRoom._id } },
                { new: true }
            );

            if (!updatedProperty) {
                throw new Error("Property not found");
            }
            return createRoom;
        } catch (error: any) {
            console.error("Error creating room:", error.message || error);
            throw error; 
        }
    }

    async addImage(data: Partial<Room>) {
    try {
        const id = data.roomId;
        const res = await RoomModel.findByIdAndUpdate(id, { $push: { images: { $each: data.images! } } }, { new: true });
        return res;
    } catch (error: any) {
        console.log(error)
    }
}
}