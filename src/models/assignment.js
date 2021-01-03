import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema({
    assignmentName: {
        type: String,
        required: true
    },
    assignmentCourse: {
        type: mongoose.ObjectId,
        ref: "Course"
    },
    assignmentDueDate: {
        type: String,
        required: true
    },
    assignmentLateDate: {
        type: String,
        required: true
    },
    assignmentIsAssigned: {
        type: Boolean,
        default: false
    },
    assignmentBrief: {
        type: mongoose.ObjectId,
        ref: "Brief"
    },
    assignmentSpecifications: {
        type: mongoose.ObjectId,
        ref: "StdIOAssignment"
    },
    dateCreated: {type: Date, default: Date.now}
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
