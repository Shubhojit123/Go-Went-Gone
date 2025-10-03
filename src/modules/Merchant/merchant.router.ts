import {Router} from "express"
import { propertyCotroller, roomController } from "./merchant.controller";
const router = Router();

const PropertyController = new propertyCotroller();
const RoomController = new roomController();


router.post("/",PropertyController.handleCreate);
router.put("/update/:_id",PropertyController.handelUpdate);
router.get("/getall",PropertyController.handelGetAll);
router.delete("/delete",PropertyController.handelDelete);
router.get("/find",PropertyController.handelfind);


//room servics 

router.post("/room/create",RoomController.handelRoom)
router.put("/room/update/:_id",RoomController.handelUpdate)
router.put("/room/add-image",RoomController.handelAddImage)

export const MerchnatRouter  = router;