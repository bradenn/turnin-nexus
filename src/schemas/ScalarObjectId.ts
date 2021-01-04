import {GraphQLScalarType, Kind} from "graphql";
import {ObjectId} from "mongodb";

/* I opted to not reinvent the wheel this time. */
/* https://github.com/MichalLytek/type-graphql/blob/v1.1.1/examples/typegoose/object-id.scalar.ts */

export const ObjectIdScalar = new GraphQLScalarType({
    name: "ObjectId",
    description: "Mongo object id scalar type",
    serialize(value: unknown): string {
        if (!(value instanceof ObjectId)) {
            throw new Error("ObjectIdScalar can only serialize ObjectId values");
        }
        return value.toHexString();
    },
    parseValue(value: unknown): ObjectId {
        if (typeof value !== "string") {
            throw new Error("ObjectIdScalar can only parse string values");
        }
        return new ObjectId(value);
    },
    parseLiteral(ast): ObjectId {
        if (ast.kind !== Kind.STRING) {
            throw new Error("ObjectIdScalar can only parse string values");
        }
        return new ObjectId(ast.value);
    },
});
