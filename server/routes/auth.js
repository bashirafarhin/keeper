import express from 'express';
import User from '../Database/models/users.js';
import passport from "passport"
import { Strategy } from "passport-local";
import session from "express-session";
import bcrypt from "bcrypt";
import MongoStore from 'connect-mongo';
import env from "dotenv";
import cookieParser from 'cookie-parser';
env.config();

const authRouter = express.Router();
const saltRounds=parseInt(process.env.SALT_ROUNDS);

authRouter.use(cookieParser());

authRouter.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URL,
            dbName: "keeper",
            collectionName: 'sessions',
            ttl: 1 * 60 * 60
        }),
        cookie: {
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        }
    })
);

authRouter.use(passport.initialize());
authRouter.use(passport.session());

authRouter.post('/register', async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
        if(user){ res.json({id : null , success : false, message : "User registered. Try Login."})}
        else {
        bcrypt.hash(password,saltRounds, async(err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).json({ id : null , success : false, error: "Internal Server Error" });
              } else {
                const newUser = new User({
                    email: email,
                    password: hash,
                    notes: [],
                    backgroundImageIndex: 0,
                });
                await newUser.save();
                const newRegisteredUser=await User.findOne({email: email});
                res.json({ id: newRegisteredUser._id.toString(), success : true, message : "Success" });
            }
    
        });
       }
    } catch(err) {
        res.status(500).json({ id : null, error: "Internal Server Error" });
    }
});


authRouter.post('/auth/google',async(req,res) => {
    try{
        const email=req.body.email;
        const user = await User.findOneAndUpdate(
            { email: new RegExp(`^${email}$`, 'i') },
            { 
                $setOnInsert: {
                    email: email,
                    password: process.env.GOOGLE_PASSWORD_SECRET,
                    notes: [],
                    backgroundImageIndex: 0
                }
            },
            { 
                new: true,
                upsert: true
            }
        );
        return res.status(200).json({ id: user._id.toString() });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
});



authRouter.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ id: req.user._id.toString(), authenticated: true });
  } else {
    return res.json({ authenticated: false });
  }
});



authRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ id: null, success : false, message : "Internal servor Error" });
      }
      if (info) {
        if(info.message==='User not registered'){
         return res.json({ id: null, success : false, message : "User not Registered" });
        } else {
         return res.json({ id: null, success : false, message : "Incorrect Password" });
        }
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ id: null, success : null, message : "Internal servor Error" });
        }
        return res.status(200).json({ id: user._id.toString(), success : true, message : "Success" });
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


authRouter.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error during logout' });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Error destroying session' });
            }
            res.status(200).json({ status: 'Success' });
        });
    });
});

authRouter.delete('/deleteAccount/:id',async(req,res) => {
    try{
        const id=req.params.id;
        await User.findByIdAndDelete(id);
        res.clearCookie('connect.sid');
        return res.sendStatus(200);
    } catch(err) {
        return res.status(500).json({ message: 'Error during deleting Account' });
    }
});

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findById(id);
        cb(null, user);
    } catch (err) {
        cb(err,null);
    }
});

export default authRouter;