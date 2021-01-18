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
    async testInput(@Root() TestSpecification: TestSpecification): Promise<File> {
        return await FileService.getFile(TestSpecification.testInput._id);
    }

    @FieldResolver(returns => File)
    async testOutput(@Root() TestSpecification: TestSpecification): Promise<File> {
        return await FileService.getFile(TestSpecification.testOutput._id);
    }

    @FieldResolver(returns => File)
    async testError(@Root() TestSpecification: TestSpecification): Promise<File> {
        return await FileService.getFile(TestSpecification.testError._id);
    }*/

    @FieldResolver(returns => [String])
    testContext(@Root() testSpecification: TestSpecification): String[] {
        let res = [];
        if (testSpecification.testInput) res.push("in");
        if (testSpecification.testArguments.length > 0) res.push("args");
        if (testSpecification.testOutput) res.push("out");
        if (testSpecification.testError) res.push("err");
        if (testSpecification.testExitCode) res.push("exit");
        if (testSpecification.testMemoryLeaks) res.push("leaks");
        if (testSpecification.testTimeout) res.push("timeout");
        if (testSpecification.testIsHidden) res.push("hidden");
        return res;
    }

}

