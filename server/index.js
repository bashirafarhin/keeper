import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv";
import "./Database/connection.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { connectToDB } from "./Database/connection.js";

env.config();

const app = express();
const port = process.env.PORT || 3000;

connectToDB();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve API routes
app.use("/user", userRouter);
app.use("/", authRouter);

app.get('/',(req,res)=>{
  res.send('Hello Developer!')
})

// Server setup
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
