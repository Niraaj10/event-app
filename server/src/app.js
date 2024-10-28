import express from 'express'
import cors from 'cors'


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());



import userRoutes from "./routes/user.routes.js";

//routes
app.use('/api/v1/user', userRoutes)


export { app }