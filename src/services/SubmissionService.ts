import {FileUpload} from "graphql-upload";
import {ObjectId} from "mongodb";
import FileService from "./FileService";
// @ts-ignore
import axios from "axios";
import {Assignment, AssignmentModel} from "../schemas/Assignment";
import {Test, TestSpecificationModel} from "../schemas/Test";
import {SpecificationModel} from "../schemas/Specification";
import {Submission, SubmissionModel} from "../schemas/Submission";
import {Result, SubmissionResultModel} from "../schemas/Result";
import {Leak, LeakModel} from "../schemas/Leak";


export default {
    async getResult(resultId: ObjectId): Promise<Result> {
        const resultRecord = await SubmissionResultModel.findById(resultId).exec();
        if (!resultRecord) throw new Error("Could not find result")
        return resultRecord
    },
    async getLeak(leakId: ObjectId): Promise<Leak> {
        return await LeakModel.findById(leakId).exec()
    },
    async getTestSpecification(testSpecificationId: ObjectId): Promise<Test> {
        const testSpecificationRecord = await TestSpecificationModel.findById(testSpecificationId).exec();
        if (!testSpecificationRecord) throw new Error("Could not find submission")
        return testSpecificationRecord
    },
    async getSubmission(submissionId: ObjectId, userId: ObjectId): Promise<Submission> {
        const submissionRecord = await SubmissionModel.findById(submissionId).populate(['files', 'results']).exec();
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

        return axios.post('http://localhost:5050/api/v1/submit', payload).then(data => {
            console.log(data.data)
            const results = data.data.grades.results;
            const compilation = data.data.compilation;

            return Promise.all(results.map(async result => {
                let lk;
                if (result.leak.elapsed !== "") {
                    lk = await LeakModel.create({
                        passed: result.leak.passed,
                        elapsed: result.leak.elapsed,
                        bytesLost: result.leak.lost.bytes,
                        blocksLost: result.leak.lost.blocks,
                        allocs: result.leak.runtime.allocs,
                        frees: result.leak.runtime.frees,
                        allBytes: result.leak.runtime.bytes,
                        leaks: result.leak.leaks.trace,
                    }).then(doc => doc)
                    console.log(lk)
                }
                return SubmissionResultModel.create({
                    test: result._id,
                    memory: result.memory,
                    duration: result.time.elapsed,
                    timeout: result.timeout,
                    leak: (typeof lk === 'undefined') ? null : lk._id,
                    stdout: result.stdout || [],
                    stderr: result.stderr || [],
                    diffout: result.diff.stdout || [],
                    differr: result.diff.stderr || [],
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
