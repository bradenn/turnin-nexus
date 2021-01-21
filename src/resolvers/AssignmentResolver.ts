import {Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root} from "type-graphql";
import assignmentService from "../services/AssignmentService";
import SpecificationService from "../services/SpecificationService";
import courseService from "../services/CourseService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Assignment} from "../schemas/Assignment";
import {Course} from "../schemas/Course";
import {AssignmentInput} from "./inputs/AssignmentInput";
import {Specification} from "../schemas/Specification";
import {Submission} from "../schemas/Submission";
import SubmissionService from "../services/SubmissionService";

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

    @Query(returns => [Assignment])
    async studentAssignments(@Ctx() {userId}: Context): Promise<Assignment[]> {
        return await assignmentService.getStudentAssignments(userId)
    }

    /* Field Resolvers */

    @FieldResolver(returns => Course)
    async course(@Root() assignment: Assignment): Promise<Course> {
        return await courseService.getCourse(assignment.course)
    }

    @FieldResolver(returns => Course)
    async brief(@Root() assignment: Assignment): Promise<Course> {
        return await courseService.getCourse(assignment.course)
    }

    @FieldResolver(returns => Specification)
    async specification(@Root() assignment: Assignment): Promise<Specification> {
        return await SpecificationService.getSpecification(assignment.specification._id)
    }

    @FieldResolver(returns => [Submission])
    async submissions(@Root() assignment: Assignment): Promise<Submission[]> {
        return await SubmissionService.getAssignmentSubmissions(assignment)
    }

}

