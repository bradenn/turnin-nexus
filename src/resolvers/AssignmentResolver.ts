import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import assignmentService from "../services/AssignmentService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Assignment} from "../schemas/Assignment";
import {Course} from "../schemas/Course";
import courseService from "../services/CourseService";

@Resolver(of => Assignment)
export class AssignmentResolver {

    @Query(returns => Assignment)
    async assignment(@Ctx() {userId}: Context,
                     @Arg("assignmentId", type => ObjectIdScalar) assignmentId: ObjectId): Promise<Assignment> {
        return await assignmentService.getAssignment(assignmentId, userId)
    }

    @FieldResolver(returns => Course)
    async assignmentCourse(@Root() assignment: Assignment): Promise<Course> {
        return await courseService.getCourse(assignment.assignmentCourse)
    }

}

