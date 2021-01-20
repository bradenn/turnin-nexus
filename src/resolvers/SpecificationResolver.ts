import {Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import SpecificationService from "../services/SpecificationService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Assignment} from "../schemas/Assignment";
import {Course} from "../schemas/Course";
import courseService from "../services/CourseService";
import {Specification} from "../schemas/Specification";
import {SpecificationInput} from "./inputs/SpecificationInput";
import {FileUpload, GraphQLUpload} from 'graphql-upload';
import {TestSpecification} from "../schemas/TestSpecification";

@Resolver(of => Specification)
export class SpecificationResolver {

    @Query(returns => Specification)
    async Specification(@Ctx() {userId}: Context,
                        @Arg("SpecificationId", type => ObjectIdScalar) SpecificationId: ObjectId): Promise<Specification> {
        return await SpecificationService.getSpecification(SpecificationId)
    }

    @Mutation(returns => Specification)
    async updateSpecification(@Ctx() {userId}: Context,
                              @Arg("SpecificationId", type => ObjectIdScalar) SpecificationId: ObjectId,
                              @Arg("SpecificationInput") SpecificationInput: SpecificationInput): Promise<Specification> {
        return await SpecificationService.editSpecification(SpecificationId, SpecificationInput);
    }

    /* Required Files */
    @Mutation(returns => Specification)
    async addRequiredFile(@Ctx() {userId}: Context,
                          @Arg("SpecificationId", type => ObjectIdScalar) SpecificationId: ObjectId,
                          @Arg("file") file: string): Promise<Specification> {
        return await SpecificationService.addRequiredFile(SpecificationId, file);
    }

    @Mutation(returns => Specification)
    async removeRequiredFile(@Ctx() {userId}: Context,
                             @Arg("SpecificationId", type => ObjectIdScalar) SpecificationId: ObjectId,
                             @Arg("file") file: string): Promise<Specification> {
        return await SpecificationService.removeRequiredFile(SpecificationId, file);
    }

    /* Provided Files */
    @FieldResolver(returns => [File])
    async specificationProvidedFiles(@Root() Specification: Specification): Promise<File[]> {
        return await SpecificationService.getProvidedFiles(Specification)
    }

    @Mutation(returns => Specification)
    async addProvidedFile(@Ctx() {userId}: Context,
                          @Arg("SpecificationId", type => ObjectIdScalar) SpecificationId: ObjectId,
                          @Arg("fileUpload", type => GraphQLUpload) fileUpload: FileUpload): Promise<Specification> {
        return await SpecificationService.addProvidedFile(SpecificationId, fileUpload, userId);
    }

    @Mutation(returns => Specification)
    async removeProvidedFile(@Ctx() {userId}: Context,
                             @Arg("SpecificationId", type => ObjectIdScalar) SpecificationId: ObjectId,
                             @Arg("fileId", type => ObjectIdScalar) fileUpload: ObjectId): Promise<Specification> {
        return await SpecificationService.removeProvidedFile(SpecificationId, fileUpload);
    }

    /* Tests */
    @Mutation(returns => Specification)
    async addCompressedTests(@Ctx() {userId}: Context,
                             @Arg("SpecificationId", type => ObjectIdScalar) SpecificationId: ObjectId,
                             @Arg("fileUpload", type => GraphQLUpload) fileUpload: FileUpload): Promise<Specification> {
        return await SpecificationService.addCompressedTests(SpecificationId, fileUpload, userId);
    }

    @FieldResolver(returns => [TestSpecification])
    async specificationTests(@Root() Specification: Specification): Promise<TestSpecification[]> {
        return await SpecificationService.getSpecificationTests(Specification.specificationTests)
    }

    @FieldResolver(returns => Course)
    async course(@Root() assignment: Assignment): Promise<Course> {
        return await courseService.getCourse(assignment.course)
    }


}

