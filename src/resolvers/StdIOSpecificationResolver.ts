import {Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import stdIOSpecificationService from "../services/StdIOSpecificationService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Assignment} from "../schemas/Assignment";
import {Course} from "../schemas/Course";
import courseService from "../services/CourseService";
import {StdIOSpecification} from "../schemas/StdIOSpecification";
import {StdIOSpecificationInput} from "./inputs/StdIOSpecificationInput";
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import {FileInput} from "./inputs/FileInput";

@Resolver(of => StdIOSpecification)
export class StdIOSpecificationResolver {

    @Query(returns => StdIOSpecification)
    async stdIOSpecification(@Ctx() {userId}: Context,
                             @Arg("stdIOSpecificationId", type => ObjectIdScalar) stdIOSpecificationId: ObjectId): Promise<StdIOSpecification> {
        return await stdIOSpecificationService.getStdIOSpecification(stdIOSpecificationId)
    }

    @Mutation(returns => StdIOSpecification)
    async updateStdIOSpecification(@Ctx() {userId}: Context,
                                   @Arg("stdIOSpecificationId", type => ObjectIdScalar) stdIOSpecificationId: ObjectId,
                                   @Arg("stdIOSpecificationInput") stdIOSpecificationInput: StdIOSpecificationInput): Promise<StdIOSpecification> {
        return await stdIOSpecificationService.editStdIOSpecification(stdIOSpecificationId, stdIOSpecificationInput);
    }

    @Mutation(returns => StdIOSpecification)
    async addRequiredFile(@Ctx() {userId}: Context,
                          @Arg("stdIOSpecificationId", type => ObjectIdScalar) stdIOSpecificationId: ObjectId,
                          @Arg("file") file: string): Promise<StdIOSpecification> {
        return await stdIOSpecificationService.addRequiredFile(stdIOSpecificationId, file);
    }

    @Mutation(returns => StdIOSpecification)
    async removeRequiredFile(@Ctx() {userId}: Context,
                             @Arg("stdIOSpecificationId", type => ObjectIdScalar) stdIOSpecificationId: ObjectId,
                             @Arg("file") file: string): Promise<StdIOSpecification> {
        return await stdIOSpecificationService.removeRequiredFile(stdIOSpecificationId, file);
    }

    @Mutation(returns => StdIOSpecification)
    async addProvidedFile(@Ctx() {userId}: Context,
                             @Arg("stdIOSpecificationId", type => ObjectIdScalar) stdIOSpecificationId: ObjectId,
                             @Arg("fileUpload", type => GraphQLUpload) fileUpload: FileUpload): Promise<StdIOSpecification> {
        return await stdIOSpecificationService.addProvidedFile(stdIOSpecificationId, fileUpload, userId);
    }

    @Mutation(returns => StdIOSpecification)
    async removeProvidedFile(@Ctx() {userId}: Context,
                          @Arg("stdIOSpecificationId", type => ObjectIdScalar) stdIOSpecificationId: ObjectId,
                          @Arg("fileId", type => ObjectIdScalar) fileUpload: ObjectId): Promise<StdIOSpecification> {
        return await stdIOSpecificationService.removeProvidedFile(stdIOSpecificationId, fileUpload);
    }

    @FieldResolver(returns => [File])
    async specificationProvidedFiles(@Root() stdIOSpecification: StdIOSpecification): Promise<File[]> {
        return await stdIOSpecificationService.getProvidedFiles(stdIOSpecification)
    }


    @FieldResolver(returns => Course)
    async assignmentCourse(@Root() assignment: Assignment): Promise<Course> {
        return await courseService.getCourse(assignment.assignmentCourse)
    }


}

