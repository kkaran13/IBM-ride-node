import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await connect(`${process.env.MONGO_URL}/${process.env.DB_NAME}`);
        console.log("MongoDB connected !!");
    } catch (error) {
        console.log("MongoDB connection error",error);
        process.exit(1);
    }
}

