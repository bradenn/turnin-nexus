import Course from '../models/course';

export default {

    async createCourse(courseBody, userId) {
        courseBody['courseInstructor'] = userId;
        const courseRecord = await Course.create(courseBody);
        if (!courseRecord) throw new Error('Failed to create record');
        return courseRecord;
    },
    async getCourse(courseId) {
        const courseRecord = await Course.findOne({_id: courseId});
        if (!courseRecord) throw new Error('Failed to create record');
        return courseRecord;
    },
    async getInstructorCourses(userId) {
        const courseRecord = await Course.find({courseInstructor: userId});
        if (!courseRecord) throw new Error('Failed to find records');
        return courseRecord;
    },
    async getInstructorCourse(courseId, userId) {
        const courseRecord = await Course.findOne({courseInstructor: userId, _id: courseId});
        if (!courseRecord) throw new Error('This course does not belong to the authenticated user or does not exist.');
        return courseRecord;
    },
    async removeCourse(courseId) {
        const courseRecord = await Course.findByIdAndDelete(courseId);
        if (!courseRecord) throw new Error('Failed to remove record');
        return courseRecord;
    }

}
