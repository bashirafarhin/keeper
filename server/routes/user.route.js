import express from "express";
import { body, param } from "express-validator";
import { addNote, updateNote, updateBackgroundImage, deleteNote, getUserProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const userRouter = express.Router();


userRouter.post('/addNote',[
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('content').optional().trim().escape(),
], authMiddleware, addNote);

userRouter.put("/updateNote/:id",[
    body('title').notEmpty().withMessage('Title is required').trim().escape(),
    body('content').optional().trim().escape(),
    param('id').isMongoId().withMessage('Invalid note ID'),
], authMiddleware, updateNote);

userRouter.post('/updateBackground',[
    body('index').isInt({ min: 0 }).withMessage('Index must be a valid positive number'),
], authMiddleware, updateBackgroundImage);

userRouter.delete("/deleteNote/:id",[
    param('id').isMongoId().withMessage('Invalid note ID'),
], authMiddleware, deleteNote);

userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;