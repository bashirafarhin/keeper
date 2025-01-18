import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Title is required'],
        trim: true,
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
    },
});

const NoteModel = new mongoose.model("Note", noteSchema);

export { noteSchema, NoteModel };
