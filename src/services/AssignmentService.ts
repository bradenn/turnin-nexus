import {AssignmentModel} from "../schemas/Assignment";
import {StdIOAssignmentModel} from "../schemas/StdIOAssignment";


export default {
    async createAssignment(assignmentBody, userId) {
        assignmentBody['assignmentCreator'] = userId;
        const assignmentRecord = await AssignmentModel.create(assignmentBody);
        if (!assignmentRecord) throw new Error('Failed to create the assignment.');
        return assignmentRecord;
    },
    async getAssignment(assignmentId, userId) {
        const assignmentRecord = await AssignmentModel.findOne({_id: assignmentId});
        if (!assignmentRecord) throw new Error('Failed to create the assignment.');
        return assignmentRecord;
    },
    async getCourseAssignments(courseId) {
        const assignmentRecord = await AssignmentModel.find({assignmentCourse: courseId});
        if (!assignmentRecord) throw new Error('Failed to create the assignment.');
        return assignmentRecord;
    },
    createStdIOAssignment(assignmentObject) {
        return new Promise((resolve, reject) => {
            StdIOAssignmentModel.create(assignmentObject)
                .then(document => resolve(document))
                .catch(error => reject(error))
        });
    }
}
