import {FieldResolver, Resolver, Root} from "type-graphql";
import SubmissionService from "../services/SubmissionService";
import {Test} from "../schemas/Test";
import {Result} from "../schemas/Result";


@Resolver(of => Result)
export class SubmissionResultResolver {

    @FieldResolver(returns => Test)
    async test(@Root() Result: Result): Promise<Test> {
        return await SubmissionService.getTestSpecification(Result.test._id)
    }

}

