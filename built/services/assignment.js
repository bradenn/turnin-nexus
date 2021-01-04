var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StdIOAssignment } from '../models/stdio';
import { Assignment } from '../models/assignment';
export default {
    createAssignment(assignmentBody, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            assignmentBody['assignmentCreator'] = userId;
            const assignmentRecord = yield Assignment.create(assignmentBody);
            if (!assignmentRecord)
                throw new Error('Failed to create the assignment.');
            return assignmentRecord;
        });
    },
    getAssignment(assignmentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const assignmentRecord = yield Assignment.findOne({ _id: assignmentId });
            if (!assignmentRecord)
                throw new Error('Failed to create the assignment.');
            return assignmentRecord;
        });
    },
    getCourseAssignments(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const assignmentRecord = yield Assignment.find({ assignmentCourse: courseId });
            if (!assignmentRecord)
                throw new Error('Failed to create the assignment.');
            return assignmentRecord;
        });
    },
    createStdIOAssignment(assignmentObject) {
        return new Promise((resolve, reject) => {
            StdIOAssignment.create(assignmentObject)
                .then(document => resolve(document))
                .catch(error => reject(error));
        });
    }
};
