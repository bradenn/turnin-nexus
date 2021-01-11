import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import stdIOTestSpecificationService from "../services/StdIOTestSpecificationService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {StdIOTestSpecification} from "../schemas/StdIOTestSpecification";
import {File} from "../schemas/File"
import FileService from "../services/FileService";

@Resolver(of => StdIOTestSpecification)
export class StdIOTestSpecificationResolver {

    @Query(returns => StdIOTestSpecification)
    async stdIOTestSpecification(@Ctx() {userId}: Context,
                                 @Arg("stdIOTestSpecificationId", type => ObjectIdScalar) stdIOTestSpecificationId: ObjectId): Promise<StdIOTestSpecification> {
        return await stdIOTestSpecificationService.getStdIOTestSpecification(stdIOTestSpecificationId)
    }

    @FieldResolver(returns => File)
    async testInput(@Root() stdIOTestSpecification: StdIOTestSpecification): Promise<File> {
        return await FileService.getFile(stdIOTestSpecification.testInput._id);
    }

    @FieldResolver(returns => File)
    async testOutput(@Root() stdIOTestSpecification: StdIOTestSpecification): Promise<File> {
        return await FileService.getFile(stdIOTestSpecification.testOutput._id);
    }

    @FieldResolver(returns => File)
    async testError(@Root() stdIOTestSpecification: StdIOTestSpecification): Promise<File> {
        return await FileService.getFile(stdIOTestSpecification.testError._id);
    }


}

