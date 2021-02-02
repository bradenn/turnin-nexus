import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {Result} from "../schemas/Result";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import SubmissionService from "../services/SubmissionService";
import {Leak} from "../schemas/Leak";


@Resolver(of => Result)
export class ResultResolver {

    @Query(returns => Result)
    async result(@Ctx() {userId}: Context,
                 @Arg("resultId", type => ObjectIdScalar) resultId: ObjectId): Promise<Result> {
        return await SubmissionService.getResult(resultId)
    }

    @FieldResolver(returns => Leak)
    async leak(@Root() result: Result): Promise<Leak> {
        return await SubmissionService.getLeak(result._id);
    }


}

