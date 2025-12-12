import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import { errorHandler } from "./middleware/error.middleware.js";
import { connectDB } from "./config/db.connection.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser())

app.use(errorHandler);


// Connect DB and start server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });

    // Handle runtime errors gracefully
    server.on("error", (error) => {
      console.error("❌ Server Error:", error);
      process.exit(1);
    });
  }).catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  });












