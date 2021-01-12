import {FileUpload} from "graphql-upload";
import {ObjectId} from "mongodb";
import FileService from "./FileService";
import {File} from "../schemas/File";
import {Assignment, AssignmentModel} from "../schemas/Assignment";
import {StdIOTestSpecificationModel} from "../schemas/StdIOTestSpecification";


export default {
    async uploadSubmission(assignmentId: ObjectId, userId: ObjectId, submissionUpload: FileUpload[]): Promise<Assignment> {
        console.log(submissionUpload[0].filename)
        const assignment = await AssignmentModel.findById(assignmentId).populate('assignmentSpecification').exec();
        console.log("Found assignment...")

        console.log("About to Ingurgitated Files...")
        const ingurgitatedFiles: File[] = await Promise.all(submissionUpload.map(file => FileService.ingurgitateFile(file, userId)));
        console.log("Ingurgitated Files...")
        const specification = assignment.assignmentSpecification;
        const tests = await StdIOTestSpecificationModel.find({_id: specification.specificationTests}).exec();
        const submissionBody = {
            submissionFiles: ingurgitatedFiles.map(file => ({
                fileName: file.fileName,
                fileReference: file.fileReference
            })),
            submissionTests: tests,
            compilationOptions: {
                compilationCommand: specification.specificationCompilationCommand,
                compilationTimeout: specification.specificationCompilationTimeout
            }
        }
        console.log(submissionBody);

        return assignment;


    }
}
