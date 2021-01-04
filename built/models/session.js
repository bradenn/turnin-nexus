import mongoose from "mongoose";
const sessionSchema = new mongoose.Schema({
    sessionOwner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    sessionToken: {
        type: String,
        required: true
    },
    dateCreated: { type: Date, default: Date.now }
});
const Session = mongoose.model('Session', sessionSchema);
export { Session };
