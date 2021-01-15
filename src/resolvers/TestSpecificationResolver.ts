import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import TestSpecificationService from "../services/TestSpecificationService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {TestSpecification} from "../schemas/TestSpecification";
import {File} from "../schemas/File"
import FileService from "../services/FileService";

@Resolver(of => TestSpecification)
export class TestSpecificationResolver {

    @Query(returns => TestSpecification)
    async TestSpecification(@Ctx() {userId}: Context,
                            @Arg("TestSpecificationId", type => ObjectIdScalar) TestSpecificationId: ObjectId): Promise<TestSpecification> {
        return await TestSpecificationService.getTestSpecification(TestSpecificationId)
    }

    @FieldResolver(returns => File)
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
    }


}

