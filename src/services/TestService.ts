import {ObjectId} from "mongodb";
import FileService, {IGroupedAndNamedFileBuffer} from "./FileService";
import {Readable} from 'stream';
import {Test, TestSpecificationModel} from "../schemas/Test";

interface ITestSpecification {
    name: string;
    exit: Number;
    stdin?: ObjectId,
    stdout?: ObjectId,
    stderr?: ObjectId,
}

export default {
    async generateTestsFromNamedFileBuffers(namedFileBuffers: IGroupedAndNamedFileBuffer[], userId: ObjectId): Promise<ObjectId[]> {
        return new Promise((resolve, reject) => {
            // One Test Per Loop
            Promise.all(namedFileBuffers.map(testRecord => {
                    let testSpecification: ITestSpecification = {
                        exit: 0,
                        name: testRecord.name
                    }
                    return Promise.all(testRecord.namedFileBuffers.map(file => {
                        let readable = new Readable();
                        readable.push(file.fileBuffer);
                        readable.push(null)
                        let ext = file.name.split('.')[1]
                        if (ext === 'exit') testSpecification['exit'] = parseInt(String(file.fileBuffer));
                        else if (ext === 'in' || ext === 'out' || ext === 'err') {
                            return FileService.createFile(file.name, readable, userId).then(document => {
                                if (ext === 'in') testSpecification.stdin = document;
                                else if (ext === 'out') testSpecification.stdout = document;
                                else if (ext === 'err') testSpecification.stderr = document;
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
    async createTestSpecification(testBody): Promise<Test> {
        const TestSpecificationRecord = await TestSpecificationModel.create(testBody);
        if (!TestSpecificationRecord) throw new Error('Failed to update Specification');
        return TestSpecificationRecord;
    }
}
