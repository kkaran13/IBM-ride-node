import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./database/db.mongodb.js";
import { sequelize } from "./database/db.mysql.js";

dotenv.config();

async function startServer() {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");

    await sequelize.authenticate(); // test MySQL connection
    console.log("MySQL connected successfully via Sequelize");

    // Sync models if needed (optional: force = true will drop & recreate tables)
    await sequelize.sync({ alter: true });
    console.log("Sequelize models synced with MySQL");

    // Start server only after both DBs are ready
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();
