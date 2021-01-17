import {Field, ObjectType} from "type-graphql"
import {getModelForClass, Ref} from "@typegoose/typegoose"
import {prop as Property} from "@typegoose/typegoose/lib/prop";
import {File} from "./File";
import {Assignment} from "./Assignment";
import {User} from "./User";
import {SubmissionResult} from "./SubmissionResult";
import {ObjectId} from "mongodb";

@ObjectType()
export class Submission {

    @Field()
    readonly _id: ObjectId;

    @Field(type => Assignment) @Property({required: true, ref: () => Assignment})
    submissionAssignment!: Assignment;

    @Field(type => User) @Property({required: true, ref: () => User})
    submissionOwner!: User;

    @Field(type => [File]) @Property({ref: "File", default: []})
    submissionFiles!: Ref<File>[]

    @Field(type => [SubmissionResult]) @Property({ref: "SubmissionResult", default: []})
    submissionResults: Ref<SubmissionResult>[];

    @Field(type => Boolean) @Property({default: false, type: Boolean})
    submissionPassedTest: boolean

    @Field(type => [String], {nullable: true}) @Property({type: [String]})
    submissionCompilationOutput: string[];

    @Field() @Property({default: ""})
    submissionCompilationTime: string

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const SubmissionModel = getModelForClass(Submission);

