import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property} from "@typegoose/typegoose"
import mongoose from "mongoose";
import {User} from "./User";

@ObjectType()
export class File {
    @Field() @Property({required: true})
    fileName!: string;

    @Field() @Property()
    fileReference: string;

    @Field(type => User) @Property({required: true, ref: () => User})
    fileOwner!: User;

    @Field() @Property({default: Date.now})
    dateCreated: string;
}

export const FileModel = getModelForClass(File);
