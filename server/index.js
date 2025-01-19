import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import "./Database/connection.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectToDB } from "./Database/connection.js";

env.config();

const app = express();
const port = process.env.PORT || 3000;

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.get('/',(req,res)=>{
  res.send('Hello Developer!')
})

// Server setup
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
