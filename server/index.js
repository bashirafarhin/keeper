import bodyParser from "body-parser";
import mongoose from 'mongoose';
import {Note} from "./Database/models/notes.js";
import express from "express";
import cors from "cors";
import User from "./Database/models/users.js";
import env from "dotenv"
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport"
import { Strategy } from "passport-local";
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});

const corsOption={
    origin: process.env.FRONTEND_URL
}

app.use(cors(corsOption));


async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection created successfully with MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

main();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
            dbName: "keeper",
            collectionName: 'sessions',
            ttl: 14 * 24 * 60 * 60
        }),
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 * 30
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

const saltRounds=parseInt(process.env.SALT_ROUNDS);


app.post('/register', async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if(user){ res.json({id : "userRegistered"})}
        else {
        bcrypt.hash(password,saltRounds, async(err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                res.status(500).json({ error: "Internal Server Error" });
              } else {
                const newUser = new User({
                    email: email,
                    password: hash,
                    notes: [],
                    backgroundImageIndex: -1,
                });
                await newUser.save();
                const newRegisteredUser=await User.findOne({email: email});
                res.json({ id: newRegisteredUser._id.toString() });
            }
    
        });
       }
    } catch(err) {
        console.error("Error registering user:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/login/register/google',async(req,res) => {
    try{
        const email=req.body.email;
        let user=await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if(!user){
            const newUser = new User({
                email: email,
                password: process.env.GOOGLE_PASSWORD_SECRET,
                notes: [],
                backgroundImageIndex: -1,
            });
            await newUser.save();
            user=await User.findOne({email: email});
        }
        res.cookie('google_auth', 'true', { maxAge: 1000 * 60 * 60 * 24 * 365, httpOnly: true });
        return res.json({ id: user._id.toString() });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
});




app.get("/notes/:id",async(req,res) =>{
    try{
        const userId=req.params.id;
        const user=await User.findOne({_id : userId});
        res.json(user.notes);
    } catch(error) {
        res.status(500).json({ message: "Error Fetching Data" });
    }
});

app.post('/notes/:id',async(req,res) =>{
    try{
        const userId=req.params.id;
        const { title, content }=req.body;
        const newNote=new Note({
            title : title,
            content : content,
        });
        try{
            const user=await User.findOne({_id : userId});
            user.notes.push(newNote);
            await user.save();
            res.sendStatus(200);
        } catch(error) {
            console.error('Error saving Data:', error);
            res.status(500).json({ message: "Error Saving Data" });
        }
    } catch {
        console.error('Internal server error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get('/notes/background/:id',async(req,res) =>{
    try{
        const userId=req.params.id;
        try{
            const user=await User.findOne({_id : userId});
            const index=user.backgroundImageIndex;
            res.json({index : index});
        } catch(error) {
            console.error('Error fetching background:', error);
            res.status(500).json({ message: "Error fetching background" });
        }
    } catch {
        console.error('Internal server error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/notes/background/:id',async(req,res) =>{
    try{
        const userId=req.params.id;
        const index=req.body.index;
        try{
            const user=await User.findOne({_id : userId});
            user.backgroundImageIndex=index;
            await user.save();
            res.sendStatus(200);
        } catch(error) {
            console.error('Error Updating background:', error);
            res.status(500).json({ message: "Error Updating background" });
        }
    } catch {
        console.error('Internal server error:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.put("/notes/:id",async(req,res) =>{
    try{
        const userId =req.params.id;
        const { noteIndex,title,content }=req.body;
        const updatedNote=new Note({ title : title ,content : content});
        const user=await User.findOne({_id : userId});
        user.notes[noteIndex]=updatedNote;
        await user.save();
        res.sendStatus(200);
    } catch(error) {
        res.status(500).json({ message: "Error Updating Data" });
    }
});

app.delete("/notes/:id/:noteIndex",async(req,res) =>{
    try{
        const userId =req.params.id;
        const noteIndex =req.params.noteIndex;
        const user=await User.findOne({_id : userId});
        user.notes.splice(noteIndex, 1);
        await user.save();
        res.sendStatus(200);
    } catch(err) {
        console.error('Error Deleting Data:', err);
        res.status(500).json({ message: "Error Deleting Data" });
    }
});


app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});


app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: info.message });
      }
      if (info) {
        if(info.message==='User not registered'){
         return res.json({ id: null });
        } else {
         return res.json({ id: false });
        }
      }

      
      req.logIn(user, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.json({ id: user._id.toString() });
      });
    })(req, res, next);
  });


passport.use(
    "local",
new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password'
      },
    async function verify(email, password, cb) {
        try {
            const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
            if (user===null){
                
                return cb(null,null, { message: 'User not registered' });
            } else {
                const hash = user.password;
                bcrypt.compare(password, hash, async (err, result) => {
                  if (err) {
                    return cb(err,null,{message : 'Error checking password'});
                  } else {
                    if (result) {
                        return cb(null,user);
                    } else {
                        return cb(null,false,{message : 'Incorrect password'});
                    }
                  }
                });
            }
        } catch (err) {
            console.error("Error finding user:", err);
            return cb(err,{message : 'Internal Server Error'});
        }
    })
  );


app.get('/logout', (req, res) => {
    // Clear the session using Passport's logout method
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error during logout' });
        }
        // Clear the session cookie explicitly
        res.clearCookie('connect.sid');
        for (const cookie in req.cookies) {
            res.clearCookie(cookie);
          }
        return res.sendStatus(200);
    });
});

app.post('/deleteAccount',async(req,res) => {
    try{
        const id=req.body.id;
        await User.findByIdAndDelete(id);
        return res.sendStatus(200);
    } catch(err) {
        return res.status(500).json({ message: 'Error during deleting Account' });
    }
});
  
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });