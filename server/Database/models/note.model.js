import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    content: {
        type: String,
    },
});

const NoteModel = new mongoose.model("Note", noteSchema);

export { noteSchema, NoteModel };
