import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import compression from "compression";
import globalError from "./middlewares/errorMiddleware.js";
import ApiError from "./utils/apiError.js";
import blogRouter from "./routes/blogRoute.js";
import dashboardRouter from "./routes/dashboardRouter.js";

const app = express();

const PORT = process.env.PORT || 5050;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.options("*", cors());
app.use(compression());
// app.set("views", "views");
app.use(express.static("public"));
app.set("view engine", "ejs");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Too many accounts created from this IP, please try again after an hour",
});
app.use("/", limiter);
app.use("/", blogRouter);
app.use("/", dashboardRouter);
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});
app.use(globalError);

// Connect to db
const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err.message);
  }
};
connectToDB();

app.listen(PORT, () => {
  console.log(`mode: ${process.env.NODE_ENV}`);
  console.log(`Server Running in Port ${PORT}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down server....`);
    process.exit(1);
  });
});
