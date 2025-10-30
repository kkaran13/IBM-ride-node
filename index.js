import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./database/db.mongodb.js";
import { sequelize } from "./database/db.mysql.js";


dotenv.config();
// console.log(dotenv.config());

async function startServer() {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");

    await sequelize.authenticate(); // test MySQL connection
    console.log("MySQL connected successfully via Sequelize");

    await sequelize.sync();
    console.log("Sequelize models synced with MySQL");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();
