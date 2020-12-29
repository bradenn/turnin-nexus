import config from '../config';
import AWS from 'aws-sdk';
import {Readable} from 'stream';
import {v4} from "uuid";

function getClient() {
    const s3Options = {
        accessKeyId: config.S3_ACCESS,
        secretAccessKey: config.S3_SECRET,
        endpoint: config.S3_ENDPOINT,
        s3ForcePathStyle: true
    };
    return new AWS.S3(s3Options);
}

export default {
    uploadFile(fileName, fileBuffer) {
        return new Promise((resolve, reject) => {
            const s3Client = getClient();
            const readStream = Readable.from(fileBuffer.toString());
            const params = {
                Bucket: config.S3_BUCKET,
                Key: `${v4().toString()}`,
                Body: readStream
            };
            s3Client.upload(params, (err, data) => {
                readStream.destroy();
                if (err || !data) reject(err);
                resolve(data.Key);
            })
        });
    },
    deleteFile(fileKey) {
        return new Promise((resolve, reject) => {
            const s3Client = getClient();
            const params = {
                Bucket: config.S3_BUCKET,
                Key: fileKey
            };
            s3Client.deleteObject(params, (err, data) => {
                if (err || !data) reject(err);
                resolve(data)
            });
        });
    }
}
