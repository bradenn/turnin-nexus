import {ObjectId} from "mongodb";
import FileService, {IGroupedAndNamedFileBuffer} from "./FileService";
import {Readable} from 'stream';
import {StdIOTestSpecification, StdIOTestSpecificationModel} from "../schemas/StdIOTestSpecification";

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
                        testName: testRecord.fileName
                    }
                    return Promise.all(testRecord.namedFileBuffers.map(file => {
                        let readable = new Readable();
                        readable.push(file.fileBuffer);
                        readable.push(null)
                        let ext = file.fileName.split('.')[1]
                        if (ext === 'exit') testSpecification['testExitCode'] = parseInt(String(file.fileBuffer));
                        else if (ext === 'in' || ext === 'out' || ext === 'err') {
                            return FileService.createFile(file.fileName, userId, readable).then(document => {
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
    async createTestSpecification(testBody): Promise<StdIOTestSpecification> {
        const stdIOTestSpecificationRecord = await StdIOTestSpecificationModel.create(testBody);
        if (!stdIOTestSpecificationRecord) throw new Error('Failed to update stdIOSpecification');
        return stdIOTestSpecificationRecord;
    }
}
