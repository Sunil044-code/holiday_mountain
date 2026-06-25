import express from 'express'
import userRouter from './routes/user.route.js'
import cors from 'cors'
import reviewRouter from './routes/review.route.js';
import trekRouter from './routes/trek.route.js';
import itineraryRouter from './routes/itinerary.route.js';
import guideRouter from './routes/guide.route.js';
import packageRouter from './routes/package.route.js';
import bookingRouter from './routes/booking.route.js';

const app =express()

app.use(cors());
app.use(express.json());


app.use('/api/user',userRouter)
app.use('/api/itinerary',itineraryRouter)
app.use('/api/treks',trekRouter)
app.use('/api/review',reviewRouter)
app.use('/api/guide',guideRouter)
app.use('/api/package',packageRouter)
app.use('/api/booking', bookingRouter)
export default app;