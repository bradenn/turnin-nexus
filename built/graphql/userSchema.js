import { userService } from '../services';
import gql from 'graphql-tag';
export const userTypeDef = gql `
  extend type Query {
    getUser(userId: String!): User
  }
  extend type Mutation {
    createUser(username: String!, email: String!, firstname: String!, lastname: String!, password: String!): User
    updateUser(email: String, password: String): User
  }
  type User {
    _id: String!,
    username: String!,
    email: String!,
    firstname: String!,
    lastname: String!,
    password: String!,
    account: String!,
    courses: [Course]
    dateEdited: String!,
    dateCreated: String!
  }
`;
export const userResolvers = {
    Query: {
        getUser: (parent, { userId }) => userService.getUser(userId)
    },
    Mutation: {
        createUser: (parent, args) => userService.createUser(args),
    }
};
