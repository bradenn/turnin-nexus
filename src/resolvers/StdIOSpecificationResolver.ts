import {Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import stdIOSpecificationService from "../services/StdIOSpecificationService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Assignment} from "../schemas/Assignment";
import {Course} from "../schemas/Course";
import courseService from "../services/CourseService";
import {CourseInput} from "./inputs/CourseInput";
import {AssignmentInput} from "./inputs/AssignmentInput";
import {StdIOSpecification} from "../schemas/StdIOSpecification";
import {StdIOSpecificationInput} from "./inputs/StdIOSpecificationInput";

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

    @FieldResolver(returns => Course)
    async assignmentCourse(@Root() assignment: Assignment): Promise<Course> {
        return await courseService.getCourse(assignment.assignmentCourse)
    }

}

