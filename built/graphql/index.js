import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import { userTypeDef, userResolvers } from './userSchema';
import { courseTypeDef, courseResolvers } from './courseSchema';
import { assignmentTypeDef, assignmentResolvers } from './assignmentSchema';
import gql from 'graphql-tag';
const typeDef = gql `
    type Query {
        _empty: String
    }
    type Mutation{
        _empty: String
    }
`;
const schema = makeExecutableSchema({
    typeDefs: [typeDef, userTypeDef, courseTypeDef, assignmentTypeDef],
    resolvers: merge(userResolvers, courseResolvers, assignmentResolvers)
});
export default schema;
