import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { swaggerUi, swaggerSpec } from "./docs/swagger.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import All Routes

import userRoute from "./routes/user.routes.js";
import vehicleRoute from "./routes/vehicle.routes.js";
import paymentRoute from "./routes/payment.routes.js"
import ratingRoute from "./routes/rating.routes.js"
import rideRoute from "./routes/ride.routes.js"

app.use("/api/v1/users", userRoute);
app.use("/api/v1/vehicles", vehicleRoute);
app.use("/api/v1/rides", rideRoute);
app.use("/api/v1/payments", paymentRoute);
app.use("/api/v1/ratings", ratingRoute)


// global error handling

app.use(errorHandler)
export default app;