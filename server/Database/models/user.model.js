import mongoose from "mongoose";
import { noteSchema } from './note.model.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from 'dotenv';
env.config();

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        minlength: [3, 'Password must be at least 3 characters long'],
        select: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    notes: {
        type: [noteSchema],
        default: [],
    },
    backgroundImage: {
        type: String,
        default: "https://st2.depositphotos.com/4376739/6818/v/450/depositphotos_68189077-stock-illustration-abstract-geometric-pattern-dot-with.jpg",
    }
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async(password) => {
    return await bcrypt.hash(password, 10);
}

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
