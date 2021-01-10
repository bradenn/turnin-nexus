import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql";
import {ObjectId} from "mongodb";
import {CourseResolver} from "../resolvers/CourseResolver";
import {UserResolver} from "../resolvers/UserResolver";
import {StdIOSpecificationResolver} from "../resolvers/StdIOSpecificationResolver";
import * as path from "path";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {User} from "../schemas/User";
import {TypegooseMiddleware} from "../middleware/typegoose";
import {AssignmentResolver} from "../resolvers/AssignmentResolver";
import {FileResolver} from "../resolvers/FileResolver";
import { graphqlUploadExpress } from 'graphql-upload';

export default app => {
    return new Promise(resolve => {


        buildSchema({
            resolvers: [CourseResolver, AssignmentResolver, UserResolver, StdIOSpecificationResolver, FileResolver],
            emitSchemaFile: path.resolve(__dirname, "schema.gql"),
            globalMiddlewares: [TypegooseMiddleware],
            scalarsMap: [{type: ObjectId, scalar: ObjectIdScalar}],
            validate: false,
        }).then(schema => {
            const server = new ApolloServer({
                uploads: false,
                // @ts-ignore
                schema, context: ({req}) => ({req, userId: req.user as User}), debug: true
            });
            app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
            app.use(server.getMiddleware())


            resolve(app)
        });
    });
};
