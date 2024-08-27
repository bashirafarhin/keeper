import express from 'express';
import User from '../Database/models/users.js';
import { Note } from '../Database/models/notes.js';

const userRouter = express.Router();

userRouter.get("/:id",async(req,res) =>{
    try{
        const userId=req.params.id;
        const user=await User.findOne({_id : userId});
        res.status(200).json({ notes : user.notes, backgroundImageIndex : user.backgroundImageIndex });
    } catch(error) {
        res.status(500).json({message: "Error Fetching Data" });
    }
});


userRouter.post('/:id',async(req,res) =>{
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
            res.status(500).json({ message: "Error Saving Data" });
        }
    } catch {
        res.status(500).json({ message: "Error Saving Data" });
    }
});

userRouter.post('/background/:id',async(req,res) =>{
    try{
        const userId=req.params.id;
        const index=req.body.index;
        try{
            const user=await User.findOne({_id : userId});
            user.backgroundImageIndex=index;
            await user.save();
            res.sendStatus(200);
        } catch(error) {
            res.status(500).json({ message: "Error Updating background" });
        }
    } catch {
        res.status(500).json({ message: "Error Updating background" });
    }
});

userRouter.put("/:id",async(req,res) =>{
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

userRouter.delete("/:id/:noteIndex",async(req,res) =>{
    try{
        const userId =req.params.id;
        const noteIndex =req.params.noteIndex;
        const user=await User.findOne({_id : userId});
        user.notes.splice(noteIndex, 1);
        await user.save();
        res.sendStatus(200);
    } catch(err) {
        res.status(500).json({ message: "Error Deleting Data" });
    }
});

export default userRouter;