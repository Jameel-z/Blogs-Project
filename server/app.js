import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import myRoutes from "./routes/index.js";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import dotenv from "dotenv";
dotenv.config();

const swaggerDocument = YAML.load("./swagger/swagger.yaml");

// Create app
const app = express();
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://192.168.21.88:3000",
      "http://localhost:5000",
    ],
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB using the URL connection string
mongoose.connect(process.env.url).then(() => {
  console.log("MongoDB connected");

  // Use routes
  app.use(myRoutes);

  // Start listening
  app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port: ${process.env.PORT}`);
  });
});
