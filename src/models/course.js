import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseSection: {
        type: Number,
    },
    courseInstructor: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    courseIsLocked: {
        type: Boolean,
        default: false
    },
    dateCreated: {type: Date, default: Date.now}
});


const Course = mongoose.model('Course', courseSchema);

export default Course;
