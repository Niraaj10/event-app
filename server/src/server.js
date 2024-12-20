import dotenv from 'dotenv'
import { app } from './app.js'; 
import connectDB from './database/dbConnect.js';

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 3000

;( async () => {
    try {
        
        await connectDB();

        app.on("errror", (error) => {
            console.log("ERRR: ", error);
            throw error
        })

        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        })

    } catch (error) {
        console.error("ERROR: ", error)
        throw err
    }
})()