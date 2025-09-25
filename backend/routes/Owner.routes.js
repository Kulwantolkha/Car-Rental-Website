import express from "express";
import {protect} from "../Middleware/auth.middleware.js"
import Owner from "../controllers/Owner.controller.js"
import {upload} from "../Middleware/multer.middleware.js"
import {addCar} from "../controllers/Owner.controller.js"
const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, Owner);
ownerRouter.post("/add-car",upload.single("image"),protect, addCar);

export default ownerRouter;