import { Request, Response } from "express";
import { BaseController } from "../../Base/Base_Class/Base.controller";
import { Property } from "./merchant.model";
import { propertyServics, roomServics } from "./merchant.service";
import { Room } from "./room.model";
import { ApiResponse } from "../../Base/Base_Class/response";

export class propertyCotroller extends BaseController<Property> {
    constructor() {
        super(new propertyServics)
    }
}

export class roomController extends BaseController<Room> {
    constructor() {
        super(new roomServics)
        this.handelRoom = this.handelRoom.bind(this);
        this.handelAddImage = this.handelAddImage.bind(this)
    }

    async handelRoom(req: Request, res: Response) {
        try {
            const service = this.service as roomServics;
            const room = await service.handelCreateRoom(req.body);
            ApiResponse.success(res, "Created successfully", room, 201);
        } catch (error: any) {
            ApiResponse.error(res, "Room creation failed", 500, error.message);
        }
    }
    async handelAddImage(req: Request, res: Response) {
        try {
            const servics = this.service as roomServics;
            const room = await servics.addImage(req.body);
            ApiResponse.success(res, "Created successfully", room, 201);

        } catch (error:any) {
            console.log(error)
            ApiResponse.error(res, "Image adding failed", 500, error.message);
        }
    }
}