import {AssignmentModel} from "../schemas/Assignment";
import {StdIOSpecification, StdIOSpecificationModel} from "../schemas/StdIOSpecification";
import {ObjectId} from "mongodb";
import {StdIOSpecificationInput} from "../resolvers/inputs/StdIOSpecificationInput";


export default {
    async initStdIOSpecification(): Promise<ObjectId> {
        const templateStdIOSpecification = {
            specificationCompilationCommand: "make",
            specificationCompilationTimeout: 5000,
            specificationRequiredFiles: [],
            specificationProvidedFiles: [],
            specificationTests: []
        }
        const stdIOSpecificationRecord = await StdIOSpecificationModel.create(templateStdIOSpecification);
        if (!stdIOSpecificationRecord) throw new Error('Failed to create the stdIOSpecification.');
        return stdIOSpecificationRecord._id;
    },
    async editStdIOSpecification(stdIOSpecificationId: ObjectId, stdIOSpecificationInput: StdIOSpecificationInput) {
        const stdIOSpecificationRecord = await StdIOSpecificationModel.findOneAndUpdate({_id: stdIOSpecificationId}, stdIOSpecificationInput);
        if (!stdIOSpecificationRecord) throw new Error('Failed to update stdIOSpecification');
        return stdIOSpecificationRecord;
    },
    async addRequiredFile(stdIOSpecificationId: ObjectId, fileName: string) {
        const stdIOSpecificationRecord = await StdIOSpecificationModel.findOneAndUpdate({_id: stdIOSpecificationId}, {specificationRequiredFiles: {$push: fileName}});
        if (!stdIOSpecificationRecord) throw new Error('Failed to update stdIOSpecification');
        return stdIOSpecificationRecord;
    },
    async getStdIOSpecification(stdIOSpecificationId): Promise<StdIOSpecification> {
        const stdIOSpecificationRecord = await StdIOSpecificationModel.findOne({_id: stdIOSpecificationId});
        if (!stdIOSpecificationRecord) throw new Error('Failed to get the stdIOSpecification.');
        return stdIOSpecificationRecord;
    },
    async getCourseAssignments(courseId) {
        const assignmentRecord = await AssignmentModel.find({assignmentCourse: courseId});
        if (!assignmentRecord) throw new Error('Failed to create the assignment.');
        return assignmentRecord;
    },
    createStdIOSpecification(assignmentObject) {
        return new Promise((resolve, reject) => {
            StdIOSpecificationModel.create(assignmentObject)
                .then(document => resolve(document))
                .catch(error => reject(error))
        });
    }
}
