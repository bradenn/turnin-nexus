import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, prop as Mongoose} from "@typegoose/typegoose"
import {File} from "./File"
import {ObjectId} from "mongodb";

@ObjectType()
export class Brief {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL()
    @Mongoose({required: true})
    briefTitle!: string;

    @GraphQL()
    @Mongoose()
    briefDesc: string;

    @GraphQL(type => File)
    @Mongoose({required: true, ref: "File"})
    briefMarkdownFile!: File;

    @GraphQL()
    @Mongoose({default: Date.now})
    dateCreated: string
}

export const BriefModel = getModelForClass(Brief);
