const {connect} = require('mongoose')
const {DB_NAME} = require("../constant")

const connectDB = async () => {
    try {
        const conn = await connect(`${process.env.MONGO_URL}/${DB_NAME}`);
        console.log("MongoDB connected !!");
    } catch (error) {
        console.log("MongoDB connection error",error);
        process.exit(1);
    }
}

module.exports = {connectDB}