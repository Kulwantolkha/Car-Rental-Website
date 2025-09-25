import express from "express";
import {protect} from "../Middleware/auth.middleware.js"
import Owner from "../controllers/Owner.controller.js"

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, Owner);

export default ownerRouter;