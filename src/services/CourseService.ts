import {CourseModel} from "../schemas/Course";
import {Course} from "../schemas/Course";


export default {

    async createCourse(courseBody, userId): Promise<Course> {
        courseBody['courseInstructor'] = userId;
        const courseRecord = await CourseModel.create(courseBody);
        if (!courseRecord) throw new Error('Failed to create record');
        return courseRecord;
    },
    async getCourse(courseId): Promise<Course> {
        const courseRecord = await CourseModel.findOne({_id: courseId});
        if (!courseRecord) throw new Error('Failed to create record');
        return courseRecord;
    },
    async getInstructorCourses(userId): Promise<Course[]> {
        const courseRecord = await CourseModel.find({courseInstructor: userId});
        if (!courseRecord) throw new Error('Failed to find records');
        return courseRecord;
    },
    async getInstructorCourse(courseId, userId): Promise<Course> {
        const courseRecord = await CourseModel.findOne({courseInstructor: userId, _id: courseId});
        if (!courseRecord) throw new Error('This course does not belong to the authenticated user or does not exist.');
        return courseRecord;
    },
    async removeCourse(courseId): Promise<Course> {
        const courseRecord = await CourseModel.findByIdAndDelete(courseId);
        if (!courseRecord) throw new Error('Failed to remove record');
        return courseRecord;
    }

}
