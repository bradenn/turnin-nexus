import {FileUpload} from "graphql-upload";
import {ObjectId} from "mongodb";
import FileService from "./FileService";
// @ts-ignore
import axios from "axios";
import {Assignment, AssignmentModel} from "../schemas/Assignment";
import {TestSpecification, TestSpecificationModel} from "../schemas/TestSpecification";
import {SpecificationModel} from "../schemas/Specification";
import {Submission, SubmissionModel} from "../schemas/Submission";
import {SubmissionResultModel} from "../schemas/SubmissionResult";


export default {
    async getTestSpecification(testSpecificationId: ObjectId): Promise<TestSpecification> {
        const testSpecificationRecord = await TestSpecificationModel.findById(testSpecificationId).exec();
        if (!testSpecificationRecord) throw new Error("Could not find submission")
        return testSpecificationRecord
    },
    async getSubmission(submissionId: ObjectId, userId: ObjectId): Promise<Submission> {
        const submissionRecord = await SubmissionModel.findById(submissionId).populate('submissionResults').exec();
        if (!submissionRecord) throw new Error("Could not find submission")
        return submissionRecord
    },
    async uploadSubmission(assignmentId: ObjectId, userId: ObjectId, submissionUpload: FileUpload[]) {
        const assignment = await AssignmentModel
            .findById(assignmentId).exec();

        const specification = await SpecificationModel
            .findById(assignment.specification)
            .populate('providedFiles').exec();

        const rawFiles = await Promise.all(submissionUpload.map(file => Promise.resolve(file)))

        const files = await Promise.all(rawFiles.map(file => {
            const {filename, createReadStream} = file;
            return FileService.tradeFile(filename, createReadStream(), userId).then(file => file)
        }));

        const tests = await TestSpecificationModel
            .find({_id: specification.tests})
            .populate(['stdin', 'stdout', 'stderr']).exec();

        let payload = {
            submissionFiles: files.concat(specification.providedFiles).map(file => ({
                name: file.name,
                reference: file.reference
            })),
            submissionTests: tests,
            compilationOptions: {
                compilationCommand: specification.command,
                compilationTimeout: specification.timeout
            }
        }

        return axios.post('http://localhost:5050/api/compile', payload).then(data => {
            const testResults = data.data.submissionTestResults;

            return Promise.all(testResults.map(result => {
                return SubmissionResultModel.create({
                    test: result._id,
                    memory: result.bytesUsed,
                    exit: result.exit,
                    testElapsedTime: result.testElapsedTime,
                    stdout: result.testOutputDiff,
                    stderr: result.testErrorDiff,
                    passed: result.passed
                }).then(doc => doc._id)
            })).then(results => {
                return SubmissionModel.create({
                    assignment: assignmentId,
                    owner: userId,
                    files: files.map(obj => obj._id),
                    results: results,
                    stdout: data.data.compilationResults.compilationOutput,
                    duration: data.data.compilationResults.compilationTime
                }).then(doc => {
                    return doc
                })
            })
        })
    },
    async getAssignmentSubmissions(submissionAssignment: Assignment) {
        const submissionRecord = await SubmissionModel.find({submissionAssignment: submissionAssignment}).populate('submissionResults').exec();
        if (!submissionRecord) throw new Error("Could not find submissions")
        return submissionRecord
    }
}
