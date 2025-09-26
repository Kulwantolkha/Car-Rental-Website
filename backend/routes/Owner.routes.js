import express from "express";
import {protect} from "../Middleware/auth.middleware.js"
import Owner from "../controllers/Owner.controller.js"
import {upload} from "../Middleware/multer.middleware.js"
import {addCar,getOwnercars,toggleCarAvailability,deleteCar, getDashboardData,updateUserImage} from "../controllers/Owner.controller.js"
const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, Owner);
ownerRouter.post("/add-car",upload.single("image"),protect, addCar);
ownerRouter.get("/cars",protect, getOwnercars);
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);
ownerRouter.post("/delete-car", protect, deleteCar);
ownerRouter.get("/dashboard", protect, getDashboardData);
ownerRouter.post("/update-image",upload.single("image"),protect, updateUserImage);


export default ownerRouter;