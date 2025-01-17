import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, logoutUser, deleteUserAccount, registerUsingGoogle, loginUsingGoogle } from '../controllers/auth.controller.js';
import { authMiddleware } from "../middleware/auth.middleware.js"

const authRouter = express.Router();

authRouter.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be of at least 3 characters long')
], registerUser);

authRouter.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be of at least 3 characters long')
], loginUser);

authRouter.post('/registerGoogle',[
    body('email').isEmail().withMessage('Invalid Email'),
], registerUsingGoogle);

authRouter.post('/loginGoogle',[
    body('email').isEmail().withMessage('Invalid Email'),
], loginUsingGoogle);

authRouter.get('/logout', authMiddleware , logoutUser);
authRouter.delete('/deleteAccount', authMiddleware, deleteUserAccount);

export default authRouter;