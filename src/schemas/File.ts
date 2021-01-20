import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, prop as Mongoose} from "@typegoose/typegoose"
import {User} from "./User";
import {ObjectId} from "mongodb";

@ObjectType()
export class File {
    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL()
    @Mongoose({required: true})
    name!: string;

    @GraphQL()
    @Mongoose()
    reference: string;

    @GraphQL(type => User)
    @Mongoose({required: true, ref: "User"})
    owner!: User;

    @GraphQL()
    @Mongoose({default: Date.now})
    created: string;
}

export const FileModel = getModelForClass(File);
