import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import { errorHandlerMiddleware } from "./src/middleware/errorHandler.js";
import { notFoundMiddleware } from "./src/middleware/notFound.js";
import "dotenv/config.js";
import jobsRoutes from "./src/routes/v1/jobsRoutes.js";
import authRoutes from "./src/routes/v1/authRoutes.js";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(morgan("dev"));

app.use("/api/v1/", jobsRoutes);
app.use("/api/v1/", authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
