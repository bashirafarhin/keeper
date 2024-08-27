import mongoose from "mongoose";
import { noteSchema } from './notes.js';

const userSchema=new mongoose.Schema({
    password :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    notes :{
        type : [noteSchema],
        default : [],
    },
    backgroundImageIndex :{
        type : Number,
        default : 0,
    }
});

const User=new mongoose.model("User",userSchema);

export default User;
