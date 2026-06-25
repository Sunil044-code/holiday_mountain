import { Router } from "express";
import { cancelBooking, createBooking, getAllBookings, getBooking, readMyBookings } from "../controllers/booking.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import{admin} from "../middleware/admin.auth.middleware.js"


const bookingRouter=Router();

bookingRouter.post('/create',protect,createBooking)
bookingRouter.get('/my-bookings',protect,readMyBookings)
bookingRouter.get('/:bookingId',protect,getBooking)
bookingRouter.patch('/cancel/:bookingId',protect,cancelBooking)
bookingRouter.get('/',protect, admin,getAllBookings)