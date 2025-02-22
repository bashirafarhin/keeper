import UserModel from "../Database/models/user.model.js";
import { validationResult } from "express-validator";
import { backgroundImages } from "../utils/backgroundImages.js";

export const addNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message : errors.array()[0].msg });
  }
  try {
    const { title, content } = req.body;
    const user = await UserModel.findOneAndUpdate(
      { email: req.user.email },
      { $push: { notes: { title, content } } },
      { new: true }
    );
    res.status(201).json({ note : user.notes[user.notes.length - 1], message: "Added note successfully." });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateBackgroundImage = async (req, res) => {
  try {
    const { backgroundImage } = req.body;
    await UserModel.findOneAndUpdate(
      { _id: req.user._id },
      { backgroundImage: backgroundImage }
    );
    res.status(200).json({ message: "Updated background successfully." });
  } catch {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message : errors.array()[0].msg });
  }
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;
    const user = await UserModel.findById(req.user._id);
    const noteIndex = user.notes.findIndex((note) => note._id.toString() === noteId);
    user.notes[noteIndex] = { ...user.notes[noteIndex], title, content };
    await user.save();
    return res.status(200).json({ message: "Updated note successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteNote = async(req,res) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message : errors.array()[0].msg });
  }
  try {
    await UserModel.findOneAndUpdate(
      { _id: req.user._id, "notes._id": req.params.id },
      { $pull: { notes: { _id: req.params.id } } },
      { new: true }
    );
    res.status(200).json({ message: 'Note deleted successfully' });
} catch (err) {
    return res.status(500).json({ message: "Something went wrong." });
}
}

export const getUserProfile = async(req,res) => {
  try {
    return await res.status(200).json({user : req.user});
  } catch(err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
}

export const getBackgroundImages = async(req,res) => {
  try {
    return res.status(200).json({ backgroundImages });
  } catch(err) {
    return res.status(500).json({ message: "Something went wrong." });
  }
}