import mongoose from "mongoose";

const sessionSchema = mongoose.Schema({
    sessionOwner: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    sessionToken: {
        type: String,
        required: true
    },
    dateCreated: {type: Date, default: Date.now}
});

const Session = mongoose.model('Session', sessionSchema);

export {Session};
