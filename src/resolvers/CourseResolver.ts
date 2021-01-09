import {Arg, Ctx, FieldResolver, Query, Resolver, Mutation, Root} from "type-graphql";
import courseService from "../services/CourseService";
import {Course} from "../schemas/Course";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Assignment} from "../schemas/Assignment";
import {User} from "../schemas/User";
import userService from "../services/UserService";
import {CourseInput} from "./inputs/CourseInput";

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

    @FieldResolver(returns => Number)
    async courseAssignmentCount(@Root() course: Course): Promise<Number> {
        return await courseService.getAssignmentCount(course._id)
    }

    @FieldResolver(returns => Number)
    async courseStudentCount(@Root() course: Course): Promise<Number> {
        return await courseService.getStudentCount(course._id)
    }

    @FieldResolver(returns => String)
    courseFullName(@Root() course: Course): String {
        return `${course.courseName}.${course.courseSection}`;
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

    @Mutation(returns => Course)
    async createCourse(@Ctx() {userId}: Context,
                           @Arg("courseInput") courseInput: CourseInput): Promise<Course> {
        return await courseService.createCourse(courseInput, userId)
    }
}

