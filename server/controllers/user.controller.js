import UserModel from "../Database/models/user.model.js";
import { validationResult } from "express-validator";

export const addNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message : errors.array()[0].msg });
  }
  try {
    const { title, content } = req.body;
    const updatedUser = await UserModel.findOneAndUpdate(
      { email: req.user.email },
      { $push: { notes: { title, content } } },
      { new: true }
    );
    res.status(200).json({ user : updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error Saving Data" });
  }
};

export const updateBackgroundImage = async (req, res) => {
  try {
    const { index } = req.body;
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.user._id },
      { backgroundImageIndex: index },
      { new: true }
    );
    res.status(200).json({ user : updatedUser });
  } catch {
    res.status(500).json({ message: "Error Updating background" });
  }
};

export const updateNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message : errors.array()[0].msg });
  }
  try {
    const newNote = req.body;
    const index = parseInt(req.params.index);
    const user = await UserModel.findById(req.user._id);
    user.notes[index] = { ...user.notes[index], ...newNote };
    res.status(200).json({ user: await user.save() });
  } catch (error) {
    res.status(500).json({ message: "Error Updating Data" });
  }
};

export const deleteNote = async(req,res) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message : errors.array()[0].msg });
  }
  try {
    const user = await UserModel.findById(req.user._id);
    const index = parseInt(req.params.index);
    user.notes.splice(index, 1);
    const updatedUser = await user.save();
    res.status(200).json({ message: 'Note deleted successfully', user: updatedUser });
} catch (error) {
    res.status(500).json({ error: 'Internal server error' });
}
}

export const getUserProfile = async(req,res) => {
  return await res.status(200).json({user : req.user});
}