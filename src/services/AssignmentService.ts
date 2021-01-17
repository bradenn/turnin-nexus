import {AssignmentModel} from "../schemas/Assignment";
import {SpecificationModel} from "../schemas/Specification";
import SpecificationService from "./SpecificationService";
import {UserModel} from "../schemas/User";
import {SubmissionModel} from "../schemas/Submission";


export default {
    async createAssignment(assignmentBody, userId) {
        assignmentBody['assignmentCreator'] = userId;
        assignmentBody.assignmentSpecification = await SpecificationService.initSpecification();
        const assignmentRecord = await AssignmentModel.create(assignmentBody);
        if (!assignmentRecord) throw new Error('Failed to create the assignment.');
        return assignmentRecord;
    },
    async getAssignment(assignmentId, userId) {
        const assignmentRecord = await AssignmentModel.findOne({_id: assignmentId});
        if (!assignmentRecord) throw new Error('Failed to create the assignment.');
        return assignmentRecord;
    },
    async getSubmissions(assignmentId) {
        const submissionRecord = await SubmissionModel.find({submissionAssignment: assignmentId});
        if (!submissionRecord) throw new Error('Failed to find submissions.');
        return submissionRecord;
    },
    async getStudentAssignments(userId) {
        const userRecord = await UserModel.findById(userId).exec()
        const assignmentRecords = await AssignmentModel.find({assignmentCourse: userRecord.courses.map(d => d._id)}).exec();
        if (!assignmentRecords) throw new Error('Failed to fetch the assignments.');
        return assignmentRecords;
    },
    async getCourseAssignments(courseId) {
        const assignmentRecord = await AssignmentModel.find({assignmentCourse: courseId});
        if (!assignmentRecord) throw new Error('Failed to create the assignment.');
        return assignmentRecord;
    },
    createSpecification(assignmentObject) {
        return new Promise((resolve, reject) => {
            SpecificationModel.create(assignmentObject)
                .then(document => resolve(document))
                .catch(error => reject(error))
        });
    }
}
