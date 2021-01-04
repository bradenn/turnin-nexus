import {StdIOAssignment} from '../models/stdio';
import {Assignment} from '../models/assignment';

export default {
    async createAssignment(assignmentBody, userId) {
        assignmentBody['assignmentCreator'] = userId;
        const assignmentRecord = await Assignment.create(assignmentBody);
        if (!assignmentRecord) throw new Error('Failed to create the assignment.');
        return assignmentRecord;
    },
    async getAssignment(assignmentId, userId) {
        const assignmentRecord = await Assignment.findOne({_id: assignmentId});
        if (!assignmentRecord) throw new Error('Failed to create the assignment.');
        return assignmentRecord;
    },
    async getCourseAssignments(courseId) {
        const assignmentRecord = await Assignment.find({assignmentCourse: courseId});
        if (!assignmentRecord) throw new Error('Failed to create the assignment.');
        return assignmentRecord;
    },
    createStdIOAssignment(assignmentObject) {
        return new Promise((resolve, reject) => {
            StdIOAssignment.create(assignmentObject)
                .then(document => resolve(document))
                .catch(error => reject(error))
        });
    }
}
