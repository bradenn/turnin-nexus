import {courseService, assignmentService} from "../services";
import gql from 'graphql-tag'

export const courseTypeDef = gql`
    type Course {
        _id: String!,
        courseName: String!,
        courseSection: Int!,
        courseInstructor: String!,
        courseIsLocked: Boolean!,
        courseAssignments: [Assignment]!,
        dateCreated: String!
    }
    extend type Query {
        getCourse(courseId: String!): Course,
        instructorCourses: [Course]!,
        instructorCourse(courseId: String!): Course,
    }
    extend type Mutation {
        createCourse(courseName: String!, courseSection: Int!): Course,
    }
`;

export const courseResolvers = {
    Course: {
        courseAssignments: ({_doc}, _, __) => assignmentService.getCourseAssignments(_doc._id),
    },
    Query: {
        getCourse: (parent, {courseId}, {userId}) => courseService.getCourse(courseId, userId),
        instructorCourses: (parent, params, {userId}) => courseService.getInstructorCourses(userId),
        instructorCourse: (parent, {courseId}, {userId}) => courseService.getInstructorCourse(courseId, userId),
    },
    Mutation: {
        createCourse: (parent, args, {userId}) => courseService.createCourse(args, userId)
    }
};
