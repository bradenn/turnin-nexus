import graphQLSchema from "../graphql";
import { ApolloServer, gql } from "apollo-server-express";

export default app => {
    return new Promise(resolve => {
        const server = new ApolloServer({ schema: graphQLSchema, graphiql: true, context: ({ req }) => ({
                userId: req.user._id,
                user: req.user
            }), debug: true });
        server.applyMiddleware({ app });
        resolve(app)
    });
};
