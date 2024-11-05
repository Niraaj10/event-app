import express from 'express'
import cors from 'cors'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());



import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.route.js";
import bookingsRoutes from "./bookings.route.js"

//routes
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/event', eventRoutes)
app.use('/api/v1/bookings', bookingsRoutes)



export { app }