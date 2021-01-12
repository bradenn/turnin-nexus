import {Arg, Ctx, Mutation, Resolver} from "type-graphql";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Assignment} from "../schemas/Assignment";
import submissionService from "../services/SubmissionService";
import {FileUpload, GraphQLUpload} from "graphql-upload";
import {StdIOSubmission} from "../schemas/StdIOSubmission";


@Resolver(of => StdIOSubmission)
export class SubmissionResolver {


    @Mutation(returns => Assignment)
    async uploadSubmission(@Ctx() {userId}: Context,
                           @Arg("assignmentId", type => ObjectIdScalar) assignmentId: ObjectId,
                           @Arg("submissionUpload", type => [GraphQLUpload]) submissionUpload: FileUpload[]): Promise<Assignment> {
        return await submissionService.uploadSubmission(assignmentId, userId, submissionUpload);
    }

}

