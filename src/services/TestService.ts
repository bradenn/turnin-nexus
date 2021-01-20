import {ObjectId} from "mongodb";
import FileService, {IGroupedAndNamedFileBuffer} from "./FileService";
import {Readable} from 'stream';
import {TestSpecification, TestSpecificationModel} from "../schemas/TestSpecification";

interface ITestSpecification {
    testName: string;
    testExitCode: Number;
    testInput?: ObjectId,
    testOutput?: ObjectId,
    testError?: ObjectId,
}

export default {
    async generateTestsFromNamedFileBuffers(namedFileBuffers: IGroupedAndNamedFileBuffer[], userId: ObjectId): Promise<ObjectId[]> {
        return new Promise((resolve, reject) => {
            // One Test Per Loop
            Promise.all(namedFileBuffers.map(testRecord => {
                    let testSpecification: ITestSpecification = {
                        testExitCode: 0,
                        testName: testRecord.name
                    }
                    return Promise.all(testRecord.namedFileBuffers.map(file => {
                        let readable = new Readable();
                        readable.push(file.fileBuffer);
                        readable.push(null)
                        let ext = file.name.split('.')[1]
                        if (ext === 'exit') testSpecification['testExitCode'] = parseInt(String(file.fileBuffer));
                        else if (ext === 'in' || ext === 'out' || ext === 'err') {
                            return FileService.createFile(file.name, readable, userId).then(document => {
                                if (ext === 'in') testSpecification.testInput = document;
                                else if (ext === 'out') testSpecification.testOutput = document;
                                else if (ext === 'err') testSpecification.testError = document;
                            });
                        }
                    }))
                        .then(() => this.createTestSpecification(testSpecification))
                        .then(spec => {
                            return spec._id;
                        });
            })).then(testIds => resolve(testIds));
        });
    },
    async createTestSpecification(testBody): Promise<TestSpecification> {
        const TestSpecificationRecord = await TestSpecificationModel.create(testBody);
        if (!TestSpecificationRecord) throw new Error('Failed to update Specification');
        return TestSpecificationRecord;
    }
}
