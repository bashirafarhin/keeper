import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import "./Database/connection.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { connectToDB } from "./Database/connection.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

env.config();

const app = express();
const port = process.env.PORT || 3000;

// Derive __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectToDB();

// Middleware
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve API routes
app.use("/user", userRouter);
app.use("/", authRouter);

// Serve static files from the dist folder
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// Catch-all route for React app (client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// Server setup
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
