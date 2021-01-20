import {expect} from "chai";
import 'mocha';
import SubmissionService from "../src/services/SubmissionService";
import {ObjectId} from "mongodb";
import {FileUpload} from "graphql-upload";
import * as fs from "fs";
import {ReadStream} from "fs-capacitor";


function generateUploadFile(): FileUpload {
    return {
        name: "File Name",
        mimetype: "",
        encoding: "",
        createReadStream(): ReadStream {
            return fs.createReadStream("./Submission.spec.ts")
        }
    };
}

describe('Upload a submission',
    () => {
        it('Should return an ObjectID', () => {
            const submissionId = SubmissionService.uploadSubmission(new ObjectId("5ff8d1e8dc0d1314fbd2aae6"), new ObjectId("5ff8d1e8dc0d1314fbd2aae6"), [generateUploadFile(), generateUploadFile()])
            expect(submissionId).to.equal({})
        });
    });
