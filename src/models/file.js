import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    fileOwner: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    fileName: {
        type: String,
        required: true
    },
    fileReference: {
        type: String,
        required: true
    },
    dateCreated: {type: Date, default: Date.now}
});

const File = mongoose.model('File', fileSchema);

export {File};
