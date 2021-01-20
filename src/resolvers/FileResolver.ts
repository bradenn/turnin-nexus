import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import fileService from "../services/FileService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {File} from "../schemas/File";

@Resolver(of => File)
export class FileResolver {

    @Query(returns => File)
    async file(@Ctx() {userId}: Context,
               @Arg("fileId", type => ObjectIdScalar) fileId: ObjectId): Promise<File> {
        return await fileService.getFile(fileId)
    }

    @FieldResolver(returns => String)
    async fileLink(@Root() file: File): Promise<String> {
        return `${process.env.S3_LINK}/${process.env.S3_BUCKET}/${file.reference}`
    }

}

