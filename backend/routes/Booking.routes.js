import express from "express"
import {protect} from "../Middleware/auth.middleware.js"
import {checkAvailabilityofCar,createBooking,getUserBookings,getOwnerBookings,changeBookingStatus} from "../controllers/Booking.controller.js"

const bookingRouter = express.Router()

bookingRouter.post("/check-availability", checkAvailabilityofCar);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user",protect,getUserBookings);
bookingRouter.get("/owner",protect,getOwnerBookings);
bookingRouter.get("/change-status",protect,changeBookingStatus);

export default bookingRouter;