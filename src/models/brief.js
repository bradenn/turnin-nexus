import mongoose from "mongoose";

const brief = mongoose.Schema({
    briefTitle: {
        type: String,
        required: true
    },
    briefDesc: {
        type: String,
        required: true
    },
    briefMarkdownFile: {
        type: mongoose.ObjectId,
        ref: "File"
    },
    dateCreated: {type: Date, default: Date.now}
});

const Brief = mongoose.model('Brief', brief);

export default Brief;
