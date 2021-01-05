import {Arg, Ctx, Query, Resolver} from "type-graphql";
import courseService from "../services/CourseService";
import {Course} from "../schemas/Course";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";

@Resolver(of => Course)
export class CourseResolver {

    @Query(returns => Course)
    async course(@Ctx() {userId}: Context,
                 @Arg("courseId", type => ObjectIdScalar) courseId: ObjectId): Promise<Course> {
        return await courseService.getCourse(courseId)
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

