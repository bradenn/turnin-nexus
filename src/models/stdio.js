import mongoose from "mongoose";

const stdIOAssignmentSchema = mongoose.Schema({
    compilationCommand: {
        type: String,
        required: true
    },
    compilationTimeout: {
        type: Number,
        default: 5000 /* This will be optimised for unset values */
    },
    assignmentRequiredFiles: {
        type: [String]
    },
    assignmentProvidedFiles: {
        type: [{
            type: mongoose.ObjectId,
            ref: "File"
        }]
    },
    assignmentTests: {
        type: [{
            type: mongoose.ObjectId,
            ref: "StdIOTestSpecification"
        }]
    },
    dateCreated: {type: Date, default: Date.now}
});

const StdIOAssignment = mongoose.model('StdIOAssignment', stdIOAssignmentSchema);

const stdIOTestSpecificationSchema = mongoose.Schema({
    testName: {
        type: String,
        required: true
    },
    testTimeout: {
        type: Number,
        default: 5000
    },
    testMemoryLeaks: {
        type: Boolean,
        default: false
    },
    testDiffTolerance: {
        type: String,
        enum: ["none", "whitespace", "punctuation", "case"]
    },
    testChecks: {
        type: [String],
        default: ["testInput", "testOutput", "testError", "testExitCode"]
    },
    testExitCode: {
        type: Number,
        default: 0
    },
    testIsHidden: {
        type: Boolean,
        default: false
    },
    testArguments: {
        type: [String],
        default: [""]
    },
    testInput: {
        type: mongoose.ObjectId,
        ref: "File",
        required: true
    },
    testOutput: {
        type: mongoose.ObjectId,
        ref: "File",
        required: true
    },
    testError: {
        type: mongoose.ObjectId,
        ref: "File",
        required: true
    },
    dateCreated: {type: Date, default: Date.now}
});

const StdIOTestSpecification = mongoose.model('StdIOTestSpecification', stdIOTestSpecificationSchema);

const stdIOSubmissionSchema= mongoose.Schema({
    submissionAssignment: {
        type: String,
        required: true
    },
    submissionFiles: {
        type: [{
            type: mongoose.ObjectId,
            ref: "File"
        }],
        required: true
    },
    assignmentCourse: {
        type: mongoose.ObjectId,
        ref: "Course"
    },
    dateCreated: {type: Date, default: Date.now}

});

const StdIOSubmissionSchema = mongoose.model('StdIOSubmission', stdIOSubmissionSchema);

const stdIOTestResultSchema = mongoose.Schema({
    testIsGraded: {
        type: Boolean,
        default: false
    },
    testMemoryLeaks: {
        tested: Boolean,
        inUseAtExit: {
            bytes: Number,
            blocks: Number
        },
        heapUsage: {
            allocations: Number,
            frees: Number,
            bytes: Number
        }
    },
    testResults: {
        type: [{
            testType: {
                type: String,
                enum: ["testOutput", "testError", "testExitCode"]
            },
            testPassed: Boolean
        }],
        required: true
    },
    testExitCode: {
        type: Number,
        required: true
    },
    testOutputDiff: {
        type: mongoose.ObjectId,
        ref: "File",
        required: true
    },
    testErrorDiff: {
        type: mongoose.ObjectId,
        ref: "File",
        required: true
    },
    dateCreated: {type: Date, default: Date.now}
});

const StdIOTestResult = mongoose.model('StdIOTestResult', stdIOTestResultSchema);

export {StdIOAssignment, StdIOTestSpecification, StdIOSubmissionSchema, StdIOTestResult};
