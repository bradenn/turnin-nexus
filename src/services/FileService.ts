import {File, FileModel} from '../schemas/File';
import s3Client from "./s3Client";
import {ObjectId} from "mongodb";
import * as Stream from "stream";
import config from "../config";


export default {
    async getFile(fileId: ObjectId): Promise<File> {
        const fileRecord: File = await FileModel.findById(fileId);
        if(!fileRecord) throw new Error('File not found.');
        return fileRecord;
    },
    createFile(fileName: string, fileOwner: ObjectId, fileStream: Stream): Promise<string> {
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
