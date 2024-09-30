import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import env from "dotenv"
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import "./Database/connection.js";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
env.config();

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('trust proxy', 1);

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
app.use(express.static(path.resolve(__dirname, '../client/dist')));

//routes
app.use('/notes',userRouter)
app.use('/',authRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});