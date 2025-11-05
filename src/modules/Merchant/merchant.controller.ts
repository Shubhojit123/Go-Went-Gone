import { Request, Response } from "express";
import { BaseController } from "../../Base/Base_Class/Base.controller";
import { Property, PropertyModel } from "./merchant.model";
import { propertyServics, roomServics } from "./merchant.service";
import { Room } from "./room.model";
import { ApiResponse } from "../../Base/Base_Class/response";
import * as geoip from "geoip-lite";
import { create } from "domain";
import * as express from 'express';
const app = express();
app.set('trust proxy', true);


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
            const room = await service.handleCreateRoom(req.body);
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

        } catch (error: any) {
            console.log(error)
            ApiResponse.error(res, "Image adding failed", 500, error.message);
        }
    }
}

export const createProperty = async (req: Request, res: Response) => {
    try {
        const property = await PropertyModel.create(req.body);
        ApiResponse.success(res, "Created successfully", property, 201);
    } catch (error: any) {
        console.error(error);
        ApiResponse.error(res, "Property adding failed", 500, error.message);
    }
};

