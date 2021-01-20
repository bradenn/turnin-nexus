import {Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import submissionService from "../services/SubmissionService";
import SubmissionService from "../services/SubmissionService";
import {FileUpload, GraphQLUpload} from "graphql-upload";
import {Submission} from "../schemas/Submission";
import {User} from "../schemas/User";
import userService from "../services/UserService";


@Resolver(of => Submission)
export class SubmissionResolver {

    @Query(returns => Submission)
    async submission(@Ctx() {userId}: Context,
                     @Arg("submissionId", type => ObjectIdScalar) submissionId: ObjectId): Promise<Submission> {
        return await SubmissionService.getSubmission(submissionId, userId)
    }

    @Mutation(returns => Submission)
    async uploadSubmission(@Ctx() {userId}: Context,
                           @Arg("assignmentId", type => ObjectIdScalar) assignmentId: ObjectId,
                           @Arg("submissionUpload", type => [GraphQLUpload]) submissionUpload: FileUpload[]): Promise<Submission> {
        return await submissionService.uploadSubmission(assignmentId, userId, submissionUpload);
    }

    @FieldResolver(returns => User)
    async submissionOwner(@Root() submission: Submission): Promise<User> {
        return await userService.getUser(submission.owner._id);
    }


}

