import {assignmentService} from "../services";
import gql from 'graphql-tag'

export const assignmentTypeDef = gql`
    type Assignment {
        _id: String!,
        assignmentName: String!,
        assignmentCourse: String!,
        assignmentDueDate: String!,
        assignmentLateDate: String!,
        assignmentIsAssigned: Boolean!,
        assignmentBrief: String!,
        assignmentSpecifications: String!,
        dateCreated: String!
    }
    extend type Query {
        getAssignment(assignmentId: String!): Assignment,
        courseAssignments(courseId: String!): [Assignment]!,
        courseAssignment(courseId: String!): Assignment
    }
    extend type Mutation {
        createAssignment(assignmentName: String!, assignmentCourse: String!, assignmentDueDate: String!, assignmentLateDate: String!): Assignment
        assignAssignment(assignmentId: String!): Assignment
    }
`;

export const assignmentResolvers = {
    Query: {
        getAssignment: (parent, {assignmentId}, {userId}) => assignmentService.getAssignment(assignmentId, userId),
        courseAssignments: (parent, params, {userId}) => assignmentService.get(userId),
        courseAssignment: (parent, {courseId}, {userId}) => assignmentService.getInstructorCourse(courseId, userId),
    },
    Mutation: {
        createAssignment: (parent, args, {userId}) => assignmentService.createAssignment(args, userId)
    }
};
