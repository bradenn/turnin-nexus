import config from '../config';
import AWS from 'aws-sdk';
import {v4} from "uuid";

function getClient() {
    let endpoint = new AWS.Endpoint(config.S3_ENDPOINT)
    endpoint.port = parseInt(config.S3_PORT);
    endpoint.protocol = 'http';
    const s3Options = {
        accessKeyId: config.S3_ACCESS,
        secretAccessKey: config.S3_SECRET,
        endpoint: endpoint,
        s3ForcePathStyle: true
    };
    return new AWS.S3(s3Options);
}

export default {
    uploadFile(fileName, fileStream) {
        return new Promise((resolve, reject) => {
            const s3Client = getClient();
            const params = {
                Bucket: config.S3_BUCKET,
                Key: `${v4().toString()}`,
                Body: fileStream
            };
            s3Client.upload(params, (err, data) => {
                fileStream.destroy();
                if (err || !data) reject(err);
                if(data) resolve(data.Key);
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
