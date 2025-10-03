import type { Application } from "express";
import {userRoutes} from "./User/user.router";
import { MerchnatRouter } from "./Merchant/merchant.router";

export default function initializeModules(app:Application) : void {
    app.use("/api/user",userRoutes)
    app.use("/api/merchant",MerchnatRouter)
}