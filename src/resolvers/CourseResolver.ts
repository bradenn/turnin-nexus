import {Ctx, Query, Resolver} from "type-graphql";
import courseService from "../services/CourseService";
import {Course} from "../schemas/Course";
import {Context} from "../schemas/Interfaces";

@Resolver(of => Course)
export class CourseResolver {
    @Query(returns => [Course])
    async instructorCourses(@Ctx() {userId}: Context): Promise<Course[]> {
        return await courseService.getInstructorCourses(userId)
    }
}

