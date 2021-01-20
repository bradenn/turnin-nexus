import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import TestSpecificationService from "../services/TestSpecificationService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {TestSpecification} from "../schemas/TestSpecification";

@Resolver(of => TestSpecification)
export class TestSpecificationResolver {

    @Query(returns => TestSpecification)
    async TestSpecification(@Ctx() {userId}: Context,
                            @Arg("TestSpecificationId", type => ObjectIdScalar) TestSpecificationId: ObjectId): Promise<TestSpecification> {
        return await TestSpecificationService.getTestSpecification(TestSpecificationId)
    }

    /*@FieldResolver(returns => File)
    async stdin(@Root() TestSpecification: TestSpecification): Promise<File> {
        return await FileService.getFile(TestSpecification.stdin._id);
    }

    @FieldResolver(returns => File)
    async stdout(@Root() TestSpecification: TestSpecification): Promise<File> {
        return await FileService.getFile(TestSpecification.stdout._id);
    }

    @FieldResolver(returns => File)
    async stderr(@Root() TestSpecification: TestSpecification): Promise<File> {
        return await FileService.getFile(TestSpecification.stderr._id);
    }*/

    @FieldResolver(returns => [String])
    testContext(@Root() testSpecification: TestSpecification): String[] {
        let res = [];
        if (testSpecification.stdin) res.push("in");
        if (testSpecification.args.length > 0) res.push("args");
        if (testSpecification.stdout) res.push("out");
        if (testSpecification.stderr) res.push("err");
        if (testSpecification.exit) res.push("exit");
        if (testSpecification.leaks) res.push("leaks");
        if (testSpecification.timeout) res.push("timeout");
        if (testSpecification.hidden) res.push("hidden");
        return res;
    }

}

