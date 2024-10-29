
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // console.log(process.env.MONGODB_URL)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);

        console.log(`DB is connected to ${connectionInstance.connection.host}`);
        // console.log(connectionInstance)
    } catch (error) {
        console.log("DB connection error", error);
        process.exit();
    }
}

export default connectDB;