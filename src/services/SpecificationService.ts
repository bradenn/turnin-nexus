import {AssignmentModel} from "../schemas/Assignment";
import {Specification, SpecificationModel} from "../schemas/Specification";
import {ObjectId} from "mongodb";
import {SpecificationInput} from "../resolvers/inputs/SpecificationInput";
import {FileUpload} from "graphql-upload";
import FileService, {IGroupedAndNamedFileBuffer} from "./FileService";
import TestService from "./TestService";
import {TestSpecification, TestSpecificationModel} from "../schemas/TestSpecification";


export default {
    async initSpecification(): Promise<ObjectId> {
        const templateSpecification = {
            command: "make",
            timeout: 5000,
            requiredFiles: [],
            providedFiles: [],
            tests: []
        }
        const SpecificationRecord = await SpecificationModel.create(templateSpecification);
        if (!SpecificationRecord) throw new Error('Failed to create the Specification.');
        return SpecificationRecord._id;
    },
    async editSpecification(SpecificationId: ObjectId, SpecificationInput: SpecificationInput) {
        const SpecificationRecord = await SpecificationModel.findOneAndUpdate({_id: SpecificationId}, SpecificationInput);
        if (!SpecificationRecord) throw new Error('Failed to update Specification');
        return SpecificationRecord;
    },
    async addRequiredFile(SpecificationId: ObjectId, name: string) {
        const SpecificationRecord = await SpecificationModel.findByIdAndUpdate(SpecificationId, {$addToSet: {requiredFiles: [name]}});
        if (!SpecificationRecord) throw new Error('Failed to update Specification');
        return SpecificationRecord;
    },
    async removeRequiredFile(SpecificationId: ObjectId, name: string) {
        const SpecificationRecord = await SpecificationModel.findByIdAndUpdate(SpecificationId, {$pullAll: {requiredFiles: [name]}});
        if (!SpecificationRecord) throw new Error('Failed to update Specification');
        return SpecificationRecord;
    },
    async addProvidedFile(SpecificationId: ObjectId, fileUpload: FileUpload, userId: ObjectId) {
        const {createReadStream, filename} = fileUpload;
        const file = await FileService.createFile(filename, createReadStream(), userId);
        const SpecificationRecord = await SpecificationModel.findByIdAndUpdate(SpecificationId, {$addToSet: {providedFiles: [file]}});
        if (!SpecificationRecord) throw new Error('Failed to update Specification');
        return SpecificationRecord;
    },
    async addCompressedTests(SpecificationId: ObjectId, fileUpload: FileUpload, userId: ObjectId) {
        const {createReadStream} = fileUpload;
        const testIds = await FileService.decompressArchive(createReadStream())
            .then((namedFileBuffer: IGroupedAndNamedFileBuffer[]) =>
                TestService.generateTestsFromNamedFileBuffers(namedFileBuffer, userId))
            .then(data => data);

        const SpecificationRecord = await SpecificationModel.findByIdAndUpdate(SpecificationId, {$addToSet: {tests: testIds}});
        if (!SpecificationRecord) throw new Error('Failed to find Specification');
        return SpecificationRecord;
    },
    async removeProvidedFile(SpecificationId: ObjectId, fileId: ObjectId) {
        const fileRecord = await FileService.deleteFile(fileId);
        if (!fileRecord) throw new Error('Failed to delete file.');
        const SpecificationRecord = await SpecificationModel.findByIdAndUpdate(SpecificationId, {$pullAll: {requiredFiles: [fileRecord._id]}});
        if (!SpecificationRecord) throw new Error('Failed to update Specification');
        return SpecificationRecord;
    },
    async getSpecification(SpecificationId: ObjectId): Promise<Specification> {
        const SpecificationRecord = await SpecificationModel.findOne({_id: SpecificationId});
        if (!SpecificationRecord) throw new Error('Failed to get the Specification.');
        return SpecificationRecord;
    },
    async getProvidedFiles(SpecificationId): Promise<File[]> {
        const SpecificationRecord = await SpecificationModel.findOne({_id: SpecificationId}).populate('providedFiles');
        if (!SpecificationRecord) throw new Error('Failed to get the Specification.');
        return SpecificationRecord.providedFiles;
    },
    async getSpecificationTests(TestSpecifications: TestSpecification[]): Promise<TestSpecification[]> {
        const SpecificationRecord = await TestSpecificationModel.find({_id: TestSpecifications}).populate(['stdin', 'stdout', 'stderr'])
        if (!SpecificationRecord) throw new Error('Failed to get the Specification.');
        return SpecificationRecord;
    },
    async getCourseAssignments(courseId) {
        const assignmentRecord = await AssignmentModel.find({course: courseId});
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
