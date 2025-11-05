import {Router} from "express";
import { addMoneyController, bookingController, CheckOutController, createWithdraw, likeController, notificationController, refund, userController } from "./user.controller";
const router = Router();
const UserController = new userController();
const LikeController = new likeController();
const NotificatioController = new notificationController();
const BookingController = new bookingController();
const AddMoneyController = new addMoneyController();
const checkOutController = new CheckOutController();

router.post("/",UserController.handleCreate);
router.get("/get",UserController.handelGetAll);
router.put("/update/:_id",UserController.handelUpdate);
router.delete("/delete",UserController.handelDelete);
router.get("/find",UserController.handelfind);

//like List
router.post("/like",LikeController.handleCreate);
router.get("/like/find",LikeController.haldelGetLikeList)
router.delete("/like/remove",LikeController.handelDelete);


// add-Money 

router.post("/add-wallet",AddMoneyController.handelAddMoney)


// access for all role
router.post("/notification",NotificatioController.handleCreate);
router.delete("/notification/delete",NotificatioController.handelDelete);
router.put("/notification/mark-read",NotificatioController.handelMarkAsRead);
router.get("/notification/get-all",NotificatioController.handelGetAllNotification)
router.put("/notification/read-all",NotificatioController.handelMarkReadAsAll);
router.delete("/notification/delete-all",NotificatioController.hadelDeleteAllNotification);



//booking
router.post("/booking",BookingController.handelBooking)
router.put("/payment-send",checkOutController.handelCheckOut)


//refund

router.put("/refund",refund);

router.post("/withdraw",createWithdraw);




// * idea is makeing a Property wise login pannel for resecption  

export const userRoutes = router;