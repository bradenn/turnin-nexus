import {Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import assignmentService from "../services/AssignmentService";
import stdIOSpecificationService from "../services/StdIOSpecificationService";
import courseService from "../services/CourseService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Assignment} from "../schemas/Assignment";
import {Course} from "../schemas/Course";
import {AssignmentInput} from "./inputs/AssignmentInput";
import {StdIOSpecification} from "../schemas/StdIOSpecification";

@Resolver(of => Assignment)
export class AssignmentResolver {

    @Query(returns => Assignment)
    async assignment(@Ctx() {userId}: Context,
                     @Arg("assignmentId", type => ObjectIdScalar) assignmentId: ObjectId): Promise<Assignment> {
        return await assignmentService.getAssignment(assignmentId, userId)
    }

    @Mutation(returns => Assignment)
    async createAssignment(@Ctx() {userId}: Context,
                           @Arg("assignmentInput") assignmentInput: AssignmentInput): Promise<Assignment> {
        return await assignmentService.createAssignment(assignmentInput, userId)
    }

    /* Field Resolvers */

    @FieldResolver(returns => Course)
    async assignmentCourse(@Root() assignment: Assignment): Promise<Course> {
        return await courseService.getCourse(assignment.assignmentCourse)
    }

    @FieldResolver(returns => StdIOSpecification)
    async assignmentSpecification(@Root() assignment: Assignment): Promise<StdIOSpecification> {
        return await stdIOSpecificationService.getStdIOSpecification(assignment.assignmentSpecification)
    }

}

