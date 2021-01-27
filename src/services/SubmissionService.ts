import {FileUpload} from "graphql-upload";
import {ObjectId} from "mongodb";
import FileService from "./FileService";
// @ts-ignore
import axios from "axios";
import {Assignment, AssignmentModel} from "../schemas/Assignment";
import {Test, TestSpecificationModel} from "../schemas/Test";
import {SpecificationModel} from "../schemas/Specification";
import {Submission, SubmissionModel} from "../schemas/Submission";
import {SubmissionResultModel} from "../schemas/Result";


export default {
    async getTestSpecification(testSpecificationId: ObjectId): Promise<Test> {
        const testSpecificationRecord = await TestSpecificationModel.findById(testSpecificationId).exec();
        if (!testSpecificationRecord) throw new Error("Could not find submission")
        return testSpecificationRecord
    },
    async getSubmission(submissionId: ObjectId, userId: ObjectId): Promise<Submission> {
        const submissionRecord = await SubmissionModel.findById(submissionId).populate('results').exec();
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
            files: files.concat(specification.providedFiles).map(file => ({
                _id: file._id,
                name: file.name,
                reference: file.reference,
                link: `${process.env.S3_LINK}/${process.env.S3_BUCKET}/${file.reference}`
            })),
            grader: {
                tests: tests
            },
            compiler: {
                cmd: specification.command,
                timeout: specification.timeout
            }
        }


        return axios.post('http://localhost:5050/api/test', payload).then(data => {
            console.log(data.data)
            const results = data.data.grades.results;
            const compilation = data.data.compilation;

            return Promise.all(results.map(result => {

                return SubmissionResultModel.create({
                    test: result._id,
                    memory: result.memory,
                    exit: result.exit,
                    duration: result.time.elapsed,
                    leak: result.leak,
                    stdout: result.stdout,
                    stderr: result.stderr,
                    passed: result.passed
                }).then(doc => {
                    return doc._id
                })

            })).then(results => {
                return SubmissionModel.create({
                    assignment: assignmentId,
                    owner: userId,
                    files: files.map(obj => obj._id),
                    results: results,
                    stdout: compilation.stdout,
                    duration: compilation.time
                }).then(doc => {
                    return doc
                })
            })
        }).catch(err => {
            console.log(err)
        })
    },
    async getAssignmentSubmissions(submissionAssignment: Assignment) {
        const submissionRecord = await SubmissionModel.find({assignment: submissionAssignment}).populate('results').exec();
        if (!submissionRecord) throw new Error("Could not find submissions")
        return submissionRecord
    }
}
