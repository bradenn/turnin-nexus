import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop} from "@typegoose/typegoose"
import mongoose from "mongoose";
import {User} from "./User";

@ObjectType()
export class File {
    @Field() @prop({required: true})
    fileName!: string;

    @Field() @prop()
    fileReference: string;

    @Field(type => User) @prop({required: true, ref: () => User})
    fileOwner!: User;

    @Field() @prop({default: Date.now})
    dateCreated: string;
}

export const FileModel = getModelForClass(File);
