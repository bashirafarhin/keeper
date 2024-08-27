import mongoose from "mongoose";

const noteSchema=new mongoose.Schema({
    title : {
        type : String,
    },
    content :{
        type : String,
    },
});

const Note=new mongoose.model("Note",noteSchema);

export {noteSchema,Note};
