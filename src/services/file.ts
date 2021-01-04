import {File} from '../models/file';
import s3Client from "./s3Client";

export default {
    createFile(fileName, fileOwner, fileBuffer) {
        return new Promise((resolve, reject) => {
            s3Client.uploadFile(fileName, fileBuffer).then(reference => {
                File.create({
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
    deleteFile(fileId) {
        return new Promise((resolve, reject) => {
            File.findOne({_id: fileId}).then(document => {
                s3Client.deleteFile(document.fileReference).then(() => {
                    File.deleteOne({_id: fileId}).then(() => resolve());
                }).catch(error => reject(error));
            }).catch(error => reject(error));
        });
    }
}
