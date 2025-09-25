import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',()=> console.log("✅ Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`)
    } catch (error) {
        console.log("🔴 Failed to connect to mongoDB database.",error.message);
    }
}

export default connectDB;