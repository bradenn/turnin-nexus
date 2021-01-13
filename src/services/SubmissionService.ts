import {FileUpload} from "graphql-upload";
import {ObjectId} from "mongodb";
import FileService from "./FileService";
import {AssignmentModel} from "../schemas/Assignment";
import {StdIOTestSpecificationModel} from "../schemas/StdIOTestSpecification";
import {StdIOSpecificationModel} from "../schemas/StdIOSpecification";


export default {
    async uploadSubmission(assignmentId: ObjectId, userId: ObjectId, submissionUpload: FileUpload[]) {
        const assignment = await AssignmentModel
            .findById(assignmentId).populate('assignmentSpecification').exec();

        const specification = await StdIOSpecificationModel
            .findById(assignment.assignmentSpecification)
            .populate('specificationProvidedFiles').exec();

        const rawFiles = await Promise.all(submissionUpload.map(file => Promise.resolve(file)))

        const files = await Promise.all(rawFiles.map(file => {
            const {filename, createReadStream} = file;
            return FileService.tradeFile(filename, createReadStream(), userId).then(file => file)
        }));

        const tests = await StdIOTestSpecificationModel
            .find({_id: specification.specificationTests})
            .populate(['testInput', 'testOutput', 'testError']).exec();

        console.log(JSON.stringify({
            submissionFiles: files.concat(specification.specificationProvidedFiles).map(file => ({
                fileName: file.fileName,
                fileReference: file.fileReference
            })),
            submissionTests: tests,
            compilationOptions: {
                compilationCommand: specification.specificationCompilationCommand,
                compilationTimeout: specification.specificationCompilationTimeout
            }
        }));
        return assignment
    }
}
