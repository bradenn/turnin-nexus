import {AssignmentModel} from "../schemas/Assignment";
import {StdIOSpecification, StdIOSpecificationModel} from "../schemas/StdIOSpecification";
import {ObjectId} from "mongodb";
import {StdIOSpecificationInput} from "../resolvers/inputs/StdIOSpecificationInput";
import {FileUpload} from "graphql-upload";
import FileService, {IGroupedAndNamedFileBuffer} from "./FileService";
import TestService from "./TestService";
import {StdIOTestSpecification, StdIOTestSpecificationModel} from "../schemas/StdIOTestSpecification";


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
        const stdIOSpecificationRecord = await StdIOSpecificationModel.findByIdAndUpdate(stdIOSpecificationId, {$addToSet: {specificationRequiredFiles: [fileName]}});
        if (!stdIOSpecificationRecord) throw new Error('Failed to update stdIOSpecification');
        return stdIOSpecificationRecord;
    },
    async removeRequiredFile(stdIOSpecificationId: ObjectId, fileName: string) {
        const stdIOSpecificationRecord = await StdIOSpecificationModel.findByIdAndUpdate(stdIOSpecificationId, {$pullAll: {specificationRequiredFiles: [fileName]}});
        if (!stdIOSpecificationRecord) throw new Error('Failed to update stdIOSpecification');
        return stdIOSpecificationRecord;
    },
    async addProvidedFile(stdIOSpecificationId: ObjectId, fileUpload: FileUpload, userId: ObjectId) {
        const {createReadStream, filename} = fileUpload;
        const file = await FileService.createFile(filename, createReadStream(), userId);
        const stdIOSpecificationRecord = await StdIOSpecificationModel.findByIdAndUpdate(stdIOSpecificationId, {$addToSet: {specificationProvidedFiles: [file]}});
        if (!stdIOSpecificationRecord) throw new Error('Failed to update stdIOSpecification');
        return stdIOSpecificationRecord;
    },
    async addCompressedTests(stdIOSpecificationId: ObjectId, fileUpload: FileUpload, userId: ObjectId) {
        const {createReadStream} = fileUpload;
        const testIds = await FileService.decompressArchive(createReadStream())
            .then((namedFileBuffer: IGroupedAndNamedFileBuffer[]) =>
                TestService.generateTestsFromNamedFileBuffers(namedFileBuffer, userId))
            .then(data => data);

        const stdIOSpecificationRecord = await StdIOSpecificationModel.findByIdAndUpdate(stdIOSpecificationId, {$addToSet: {specificationTests: testIds}});
        if (!stdIOSpecificationRecord) throw new Error('Failed to find stdIOSpecification');
        return stdIOSpecificationRecord;
    },
    async removeProvidedFile(stdIOSpecificationId: ObjectId, fileId: ObjectId) {
        const fileRecord = await FileService.deleteFile(fileId);
        if (!fileRecord) throw new Error('Failed to delete file.');
        const stdIOSpecificationRecord = await StdIOSpecificationModel.findByIdAndUpdate(stdIOSpecificationId, {$pullAll: {specificationRequiredFiles: [fileRecord._id]}});
        if (!stdIOSpecificationRecord) throw new Error('Failed to update stdIOSpecification');
        return stdIOSpecificationRecord;
    },
    async getStdIOSpecification(stdIOSpecificationId): Promise<StdIOSpecification> {
        const stdIOSpecificationRecord = await StdIOSpecificationModel.findOne({_id: stdIOSpecificationId});
        if (!stdIOSpecificationRecord) throw new Error('Failed to get the stdIOSpecification.');
        return stdIOSpecificationRecord;
    },
    async getProvidedFiles(stdIOSpecificationId): Promise<File[]> {
        const stdIOSpecificationRecord = await StdIOSpecificationModel.findOne({_id: stdIOSpecificationId}).populate('specificationProvidedFiles');
        if (!stdIOSpecificationRecord) throw new Error('Failed to get the stdIOSpecification.');
        return stdIOSpecificationRecord.specificationProvidedFiles;
    },
    async getSpecificationTests(stdIOTestSpecifications: StdIOTestSpecification[]): Promise<StdIOTestSpecification[]> {
        const stdIOSpecificationRecord = await StdIOTestSpecificationModel.find({_id: stdIOTestSpecifications}).populate(['testInput', 'testOutput', 'testError'])
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
