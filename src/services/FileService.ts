import {File, FileModel} from '../schemas/File';
import s3Client from "./s3Client";
import {ObjectId} from "mongodb";
import Stream from "stream";
import config from "../config";
import tar from "tar-stream"
import {createGunzip} from "zlib";

export interface INamedFileBuffer {
    fileName: string;
    fileBuffer: Buffer;
}

export interface IGroupedAndNamedFileBuffer {
    fileName: string;
    namedFileBuffers: INamedFileBuffer[];
}

function groupNamedFileBuffers(fileBuffers: INamedFileBuffer[]): Promise<IGroupedAndNamedFileBuffer[]> {
    return new Promise((resolve, reject) => {
        const rawGroups = fileBuffers.reduce((reduce, value: INamedFileBuffer) => {
            const serializedFileName: string = value.fileName.split('.')[0];
            reduce[serializedFileName] = [...reduce[serializedFileName] || [], value]
            return reduce;
        }, {});
        const groupedAndNamedFileBuffers: IGroupedAndNamedFileBuffer[] = Object.keys(rawGroups).map(groupKey => {
            const namedFileBuffers: INamedFileBuffer[] = rawGroups[groupKey];
            const groupedAndNamedFileBuffer: IGroupedAndNamedFileBuffer = {
                fileName: groupKey,
                namedFileBuffers: namedFileBuffers
            };
            return groupedAndNamedFileBuffer;
        });
        resolve(groupedAndNamedFileBuffers);
    });
}

export default {
    async getFile(fileId: ObjectId): Promise<File> {
        const fileRecord: File = await FileModel.findById(fileId);
        if (!fileRecord) throw new Error('File not found.');
        return fileRecord;
    },

    decompressArchive(fileStream: Stream): Promise<IGroupedAndNamedFileBuffer[]> {
        return new Promise((resolve, reject) => {
            let textData: INamedFileBuffer[] = [];
            const extract = tar.extract();
            // Extract method accepts each tarred file as entry, separating header and stream of contents:
            extract.on('entry', (header, stream, next) => {
                stream.on('data', (chunk) => {
                    let filename = header.name.substr(header.name.lastIndexOf('/') + 1);
                    if (!filename.includes('._') &&
                        (filename.endsWith(".in") || filename.endsWith(".out") || filename.endsWith(".err")
                            || filename.endsWith(".exit") || filename.endsWith(".cmd") || filename.endsWith(".hide"))) {
                        textData.push({fileName: filename, fileBuffer: chunk});
                    }
                });
                stream.on('error', (err) => {
                    reject(err);
                });
                stream.on('end', () => {
                    next();
                });
                stream.resume();
            });
            extract.on('finish', () => {
                groupNamedFileBuffers(textData)
                    .then(data => resolve(data))
                    .catch(data => reject(data))
            });
            // We unzip buffer and convert it to Readable Stream and then pass to tar-stream's extract method:
            fileStream.pipe(createGunzip()).pipe(extract);

        });
    },

    createFile(fileName: string, fileOwner: ObjectId, fileStream: Stream): Promise<ObjectId> {
        return new Promise((resolve, reject) => {
            s3Client.uploadFile(fileName, fileStream).then(reference => {
                FileModel.create({
                    fileName: fileName,
                    fileOwner: fileOwner,
                    fileReference: reference
                }).then(document => {
                    resolve(document._id);
                }).catch(error => {
                    reject(error);
                });
            });
        });
    },
    deleteFile(fileId: ObjectId): Promise<File> {
        return new Promise((resolve, reject) => {
            FileModel.findById(fileId).then(document => {
                s3Client.deleteFile(document.fileReference).then(() => {
                    FileModel.deleteOne({_id: fileId})
                        .then(() => resolve(document))
                        .catch((err) => reject(err))
                }).catch(error => reject(error));
            }).catch(error => reject(error));
        });
    }
}
