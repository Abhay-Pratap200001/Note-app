import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import path from 'path';

import { errorHandler } from "./middleware/error.middleware.js";
import { connectDB } from "./config/db.connection.js";
import authRouter from './Routes/user.Routes.js'
import noteRouter from './Routes/note.Routes.js'


dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const app = express();



app.use(cookieParser()) //for accepting the cookies from client
app.use(express.json()) //for input data



// user and not routes
app.use("/api/auth", authRouter)
app.use("/api/note", noteRouter)



app.use(express.static(path.join(__dirname, 'client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})



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












