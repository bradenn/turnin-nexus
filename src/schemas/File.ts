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
    fileName!: string;

    @GraphQL()
    @Mongoose()
    fileReference: string;

    @GraphQL(type => User)
    @Mongoose({required: true, ref: "User"})
    fileOwner!: User;

    @GraphQL()
    @Mongoose({default: Date.now})
    dateCreated: string;
}

export const FileModel = getModelForClass(File);
