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
    title!: string;

    @GraphQL()
    @Mongoose()
    description: string;

    @GraphQL(type => File)
    @Mongoose({required: true, ref: "File"})
    markdown!: File;

    @GraphQL()
    @Mongoose({default: Date.now})
    created: string
}

export const BriefModel = getModelForClass(Brief);
