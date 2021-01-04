import graphQLSchema from "../graphql";
import {ApolloServer, gql} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {ObjectId} from "mongodb";
import {CourseResolver} from "../resolvers/CourseResolver";
import * as path from "path";
import {Context} from "../schemas/Interfaces";
import { ObjectIdScalar } from "../schemas/ScalarObjectId";
import {User} from "../schemas/User";

export default app => {
    return new Promise(resolve => {

        const schema = buildSchema({
            resolvers: [CourseResolver],
            emitSchemaFile: path.resolve(__dirname, "schema.gql"),
            // use document converting middleware
            /*globalMiddlewares: [TypegooseMiddleware],*/
            // use ObjectId scalar mapping
            scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
            validate: false,
        }).then(schema => {
            const server = new ApolloServer({
                // @ts-ignore
                schema, context: ({req}) => ({req, userId: req.user as User}), debug: true
            });
            server.applyMiddleware({app});
            resolve(app)
        });
    });
};
