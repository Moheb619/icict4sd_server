import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import contactUs from "./routes/contact.js";
import auth from "./routes/auth.js";
import formData from "express-form-data";
const app = express();
dotenv.config();
const corsConfig = {
  origin: true,
  credentials: true,
};
//middlewares Start
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(formData.parse());
//middlewares End

// Use Routes Start
app.use("/api/contactUs", contactUs);
app.use("/api/auth", auth);
// Use Routes End

// Error Status Start
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
// Error Status End
const port = process.env.PORT || 5000;
// Connection Status
const server = app.listen(port, () => console.log(`🚀 Server ready at: http://localhost:${port}`));
