import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop, Ref} from "@typegoose/typegoose"
import {prop as Property} from "@typegoose/typegoose/lib/prop";
import {File} from "./File";
import {StdIOTestSpecification} from "./StdIOTestSpecification";
import {Assignment} from "./Assignment";
import {User} from "./User";
import {StdIOSubmissionResult} from "./StdIOSubmissionResult";

@ObjectType()
export class StdIOSubmission {
    @Field(type => Assignment) @Property({required: true, ref: () => Assignment})
    submissionAssignment!: Assignment;

    @Field(type => User) @Property({required: true, ref: () => User})
    submissionOwner!: User;

    @Field(type => [File]) @Property({ref: "File", default: []})
    submissionFiles!: Ref<File>[]

    @Field(type => [StdIOSubmissionResult]) @Property({ref: "StdIOSubmissionResult", default: []})
    submissionResults: Ref<StdIOSubmissionResult>[];

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const StdIOSubmissionModel = getModelForClass(StdIOSubmission);
