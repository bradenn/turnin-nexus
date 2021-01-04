import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop} from "@typegoose/typegoose"
import {File} from "./File"

@ObjectType()
export class Brief {
    @Field() @prop({required: true})
    briefTitle!: string;

    @Field() @prop()
    briefDesc: string;

    @Field(type => File) @prop({required: true, ref: () => File})
    briefMarkdownFile!: File;

    @Field() @prop({default: Date.now})
    dateCreated: string
}

export const BriefModel = getModelForClass(Brief);
