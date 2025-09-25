import express from "express";
import {registerUser, loginUser, getUserData} from "../controllers/UserController.js"
import {protect} from "../Middleware/auth.middleware.js"
const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/data", protect, getUserData);
export default userRouter;