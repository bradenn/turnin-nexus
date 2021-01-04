var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CourseModel } from '../schemas/Course';
export default {
    createCourse(courseBody, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            courseBody['courseInstructor'] = userId;
            const courseRecord = yield CourseModel.create(courseBody);
            if (!courseRecord)
                throw new Error('Failed to create record');
            return courseRecord;
        });
    },
    getCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseRecord = yield CourseModel.findOne({ _id: courseId });
            if (!courseRecord)
                throw new Error('Failed to create record');
            return courseRecord;
        });
    },
    getInstructorCourses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseRecord = yield CourseModel.find({ courseInstructor: userId });
            if (!courseRecord)
                throw new Error('Failed to find records');
            return courseRecord;
        });
    },
    getInstructorCourse(courseId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseRecord = yield CourseModel.findOne({ courseInstructor: userId, _id: courseId });
            if (!courseRecord)
                throw new Error('This course does not belong to the authenticated user or does not exist.');
            return courseRecord;
        });
    },
    removeCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseRecord = yield CourseModel.findByIdAndDelete(courseId);
            if (!courseRecord)
                throw new Error('Failed to remove record');
            return courseRecord;
        });
    }
};
