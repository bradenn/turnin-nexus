import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property} from "@typegoose/typegoose"
import {File} from "./File"

@ObjectType()
export class Brief {
    @Field() @Property({required: true})
    briefTitle!: string;

    @Field() @Property()
    briefDesc: string;

    @Field(type => File) @Property({required: true, ref: () => File})
    briefMarkdownFile!: File;

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const BriefModel = getModelForClass(Brief);
