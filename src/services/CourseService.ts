import {Course, CourseModel} from "../schemas/Course";
import {ObjectId} from "mongodb";
import {AssignmentModel} from "../schemas/Assignment";
import {UserModel} from "../schemas/User";


export default {

    async createCourse(courseBody, userId): Promise<Course> {
        courseBody['instructor'] = userId;
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
        const courseRecord = await CourseModel.find({instructor: userId});
        if (!courseRecord) throw new Error('Failed to find records');
        return courseRecord;
    },
    async getInstructorCourse(courseId, userId): Promise<Course> {
        const courseRecord = await CourseModel.findOne({instructor: userId, _id: courseId});
        if (!courseRecord) throw new Error('This course does not belong to the authenticated user or does not exist.');
        return courseRecord;
    },
    async removeCourse(courseId): Promise<Course> {
        const courseRecord = await CourseModel.findByIdAndDelete(courseId);
        if (!courseRecord) throw new Error('Failed to remove record');
        return courseRecord;
    },
    async getAssignments(courseId: ObjectId) {
        const assignmentRecords = await AssignmentModel.find({course: courseId})
        if (!assignmentRecords) throw new Error('Failed to remove record');
        return assignmentRecords;
    },
    async getAssignmentCount(courseId: ObjectId): Promise<Number> {
        const assignmentCount = await AssignmentModel.countDocuments({course: courseId});
        if (!assignmentCount && assignmentCount !== 0) throw new Error('Failed to count assignments');
        return assignmentCount;
    },
    async getStudentCount(courseId: ObjectId): Promise<Number> {
        const userCount = await UserModel.countDocuments({courses: {$all: [courseId]}})
        if (!userCount && userCount !== 0) throw new Error('Failed to count users');
        return userCount;
    }
}
