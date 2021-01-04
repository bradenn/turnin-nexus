import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
    assignmentName: {
        type: String,
        required: true
    },
    assignmentCourse: {
        type: mongoose.SchemaTypes.ObjectId,
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
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Brief"
    },
    assignmentSpecifications: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "StdIOAssignment"
    },
    dateCreated: { type: Date, default: Date.now }
});
export const Assignment = mongoose.model('Assignment', assignmentSchema);
