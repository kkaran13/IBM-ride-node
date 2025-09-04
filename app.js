import express from "express";
import cookieParser from "cookie-parser";
import  {errorHandler}  from "./middlewares/errorHandler.middleware.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Import All Routes
import userRoute from "./routes/user.routes.js"

app.use("/api/v1/users",userRoute);
app.use(errorHandler)
export default app; 
