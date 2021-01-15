import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property} from "@typegoose/typegoose"
import {ObjectId} from "mongodb";
import {TestSpecification} from "./TestSpecification";

@ObjectType()
export class SubmissionResult {

    @Field()
    readonly _id: ObjectId;

    @Field(type => TestSpecification) @Property({required: true, ref: "TestSpecification"})
    resultTest!: TestSpecification

    @Field({nullable: false}) @Property({default: false})
    testPassed: boolean;

    @Field() @Property({default: 0})
    memoryUsed: number

    @Field() @Property({default: 0})
    exitCode: number

    @Field(type => String) @Property({default: "0ms"})
    testElapsedTime: string

    @Field(type => [String], {nullable: true}) @Property({type: [String]})
    testOutput: string[];

    @Field(type => [String], {nullable: true}) @Property({type: [String]})
    testError: string[];

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const SubmissionResultModel = getModelForClass(SubmissionResult);

