import express from "express";
import cors from "cors";
import swaggerDocument from "./config/swagger.config.js";
import { globalErrorHandler } from "./utils/error.util.js";
import swaggerUi from "swagger-ui-express";
import router from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_ALLOWED_METHODS,
    credentials: process.env.CORS_ALLOW_CREDENTIALS,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/api/v1", router);

// Error handling middleware
app.use(globalErrorHandler)

export { app };
