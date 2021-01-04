import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {ObjectId} from "mongodb";
import {CourseResolver} from "../resolvers/CourseResolver";
import * as path from "path";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {User} from "../schemas/User";
import {TypegooseMiddleware} from "../middleware/typegoose";

export default app => {
    return new Promise(resolve => {

        buildSchema({
            resolvers: [CourseResolver],
            emitSchemaFile: path.resolve(__dirname, "schema.gql"),
            globalMiddlewares: [TypegooseMiddleware],
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
