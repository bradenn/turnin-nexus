import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop} from "@typegoose/typegoose"
import {prop as Property} from "@typegoose/typegoose/lib/prop";
import {File} from "./File";

@ObjectType()
export class StdIOSubmissionResult {

    @Field() @Property({default: Date.now})
    testExitCode: number

    @Field(type => File) @Property({ref: () => File})
    submissionTestOutput: File;

    @Field(type => File) @Property({ref: () => File})
    submissionTestError: File;

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const StdIOSubmissionResultModel = getModelForClass(StdIOSubmissionResult);

