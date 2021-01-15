import {FieldResolver, Resolver, Root} from "type-graphql";
import SubmissionService from "../services/SubmissionService";
import {TestSpecification} from "../schemas/TestSpecification";
import {SubmissionResult} from "../schemas/SubmissionResult";


@Resolver(of => SubmissionResult)
export class SubmissionResultResolver {

    @FieldResolver(returns => TestSpecification)
    async resultTest(@Root() submissionResult: SubmissionResult): Promise<TestSpecification> {
        return await SubmissionService.getTestSpecification(submissionResult.resultTest._id)
    }

}

