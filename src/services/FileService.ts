import {File, FileModel} from '../schemas/File';
import s3Client from "./s3Client";
import {ObjectId} from "mongodb";


export default {
    async getFile(fileId: ObjectId): Promise<File> {
        const fileRecord: File = await FileModel.findById(fileId);
        if(!fileRecord) throw new Error('File not found.');
        return fileRecord;
    },
    createFile(fileName: string, fileOwner: string, fileBuffer: Buffer): Promise<string> {
        return new Promise((resolve, reject) => {
            s3Client.uploadFile(fileName, fileBuffer).then(reference => {
                FileModel.create({
                    fileName: fileName,
                    fileOwner: fileOwner,
                    fileReference: reference
                }).then(document => {
                    resolve(document._id);
                    console.log(reference)
                }).catch(error => {
                    reject(error);
                });
            });
        });
    },
    deleteFile(fileId: string) {
        return new Promise((resolve, reject) => {
            FileModel.findOne({_id: fileId}).then(document => {
                s3Client.deleteFile(document.fileReference).then(() => {
                    FileModel.deleteOne({_id: fileId}).then(status => resolve(status));
                }).catch(error => reject(error));
            }).catch(error => reject(error));
        });
    }
}
