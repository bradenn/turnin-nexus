import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import courseService from "../services/CourseService";
import {Course} from "../schemas/Course";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Assignment} from "../schemas/Assignment";
import {User} from "../schemas/User";
import userService from "../services/UserService";

@Resolver(of => Course)
export class CourseResolver {

    @Query(returns => Course)
    async course(@Ctx() {userId}: Context,
                 @Arg("courseId", type => ObjectIdScalar) courseId: ObjectId): Promise<Course> {
        return await courseService.getCourse(courseId)
    }

    @FieldResolver(returns => [Assignment])
    async courseAssignments(@Root() course: Course): Promise<Assignment[]> {
        return await courseService.getAssignments(course._id)
    }

    @Query(returns => [Course])
    async instructorCourses(@Ctx() {userId}: Context): Promise<Course[]> {
        return await courseService.getInstructorCourses(userId)
    }

    @Query(returns => Course)
    async instructorCourse(@Ctx() {userId}: Context,
                           @Arg("courseId", type => ObjectIdScalar) courseId: ObjectId): Promise<Course> {
        return await courseService.getInstructorCourse(courseId, userId)
    }
}

