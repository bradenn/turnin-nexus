import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import TestSpecificationService from "../services/TestSpecificationService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Test} from "../schemas/Test";

@Resolver(of => Test)
export class TestSpecificationResolver {

    @Query(returns => Test)
    async TestSpecification(@Ctx() {userId}: Context,
                            @Arg("TestSpecificationId", type => ObjectIdScalar) TestSpecificationId: ObjectId): Promise<Test> {
        return await TestSpecificationService.getTestSpecification(TestSpecificationId)
    }

    /*@FieldResolver(returns => File)
    async stdin(@Root() Test: Test): Promise<File> {
        return await FileService.getFile(Test.stdin._id);
    }

    @FieldResolver(returns => File)
    async stdout(@Root() Test: Test): Promise<File> {
        return await FileService.getFile(Test.stdout._id);
    }

    @FieldResolver(returns => File)
    async stderr(@Root() Test: Test): Promise<File> {
        return await FileService.getFile(Test.stderr._id);
    }*/

    @FieldResolver(returns => [String])
    testContext(@Root() testSpecification: Test): String[] {
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

