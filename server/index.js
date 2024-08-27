import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv"


import "./Database/connection.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
env.config();

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});

const corsOption={
    origin: process.env.FRONTEND_URL,
    credentials : true
}
app.use(cors(corsOption));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


//routes
app.use('/notes',userRouter)
app.use('/',authRouter)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});