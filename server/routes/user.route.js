import express from "express";
import { body, param } from "express-validator";
import { addNote, updateNote, updateBackgroundImage, deleteNote, getUserProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const userRouter = express.Router();


userRouter.post('/addNote',[
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('content').optional().trim().escape(),
], authMiddleware, addNote);

userRouter.put("/updateNote/:index",[
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('content').optional().trim().escape(),
    param('index').isInt({ min: 0 }).withMessage('Index must be a non-negative integer'),
], authMiddleware, updateNote);

userRouter.post('/updateBackground',[
    body('index').isInt({ min: 0 }).withMessage('Index must be a valid positive number'),
], authMiddleware, updateBackgroundImage);

userRouter.delete("/deleteNote/:index",[
    param('index').isInt({ min: 0 }).withMessage('Index must be a non-negative integer'),
], authMiddleware, deleteNote);

userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;