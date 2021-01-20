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
            specificationCompilationCommand: "make",
            specificationCompilationTimeout: 5000,
            specificationRequiredFiles: [],
            specificationProvidedFiles: [],
            specificationTests: []
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
    async addRequiredFile(SpecificationId: ObjectId, fileName: string) {
        const SpecificationRecord = await SpecificationModel.findByIdAndUpdate(SpecificationId, {$addToSet: {specificationRequiredFiles: [fileName]}});
        if (!SpecificationRecord) throw new Error('Failed to update Specification');
        return SpecificationRecord;
    },
    async removeRequiredFile(SpecificationId: ObjectId, fileName: string) {
        const SpecificationRecord = await SpecificationModel.findByIdAndUpdate(SpecificationId, {$pullAll: {specificationRequiredFiles: [fileName]}});
        if (!SpecificationRecord) throw new Error('Failed to update Specification');
        return SpecificationRecord;
    },
    async addProvidedFile(SpecificationId: ObjectId, fileUpload: FileUpload, userId: ObjectId) {
        const {createReadStream, filename} = fileUpload;
        const file = await FileService.createFile(filename, createReadStream(), userId);
        const SpecificationRecord = await SpecificationModel.findByIdAndUpdate(SpecificationId, {$addToSet: {specificationProvidedFiles: [file]}});
        if (!SpecificationRecord) throw new Error('Failed to update Specification');
        return SpecificationRecord;
    },
    async addCompressedTests(SpecificationId: ObjectId, fileUpload: FileUpload, userId: ObjectId) {
        const {createReadStream} = fileUpload;
        const testIds = await FileService.decompressArchive(createReadStream())
            .then((namedFileBuffer: IGroupedAndNamedFileBuffer[]) =>
                TestService.generateTestsFromNamedFileBuffers(namedFileBuffer, userId))
            .then(data => data);

        const SpecificationRecord = await SpecificationModel.findByIdAndUpdate(SpecificationId, {$addToSet: {specificationTests: testIds}});
        if (!SpecificationRecord) throw new Error('Failed to find Specification');
        return SpecificationRecord;
    },
    async removeProvidedFile(SpecificationId: ObjectId, fileId: ObjectId) {
        const fileRecord = await FileService.deleteFile(fileId);
        if (!fileRecord) throw new Error('Failed to delete file.');
        const SpecificationRecord = await SpecificationModel.findByIdAndUpdate(SpecificationId, {$pullAll: {specificationRequiredFiles: [fileRecord._id]}});
        if (!SpecificationRecord) throw new Error('Failed to update Specification');
        return SpecificationRecord;
    },
    async getSpecification(SpecificationId: ObjectId): Promise<Specification> {
        const SpecificationRecord = await SpecificationModel.findOne({_id: SpecificationId});
        if (!SpecificationRecord) throw new Error('Failed to get the Specification.');
        return SpecificationRecord;
    },
    async getProvidedFiles(SpecificationId): Promise<File[]> {
        const SpecificationRecord = await SpecificationModel.findOne({_id: SpecificationId}).populate('specificationProvidedFiles');
        if (!SpecificationRecord) throw new Error('Failed to get the Specification.');
        return SpecificationRecord.specificationProvidedFiles;
    },
    async getSpecificationTests(TestSpecifications: TestSpecification[]): Promise<TestSpecification[]> {
        const SpecificationRecord = await TestSpecificationModel.find({_id: TestSpecifications}).populate(['testInput', 'testOutput', 'testError'])
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
