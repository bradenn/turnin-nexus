import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property} from "@typegoose/typegoose"
import {File} from "./File"
import {ObjectId} from "mongodb";

@ObjectType()
export class TestSpecification {

    @Field()
    readonly _id: ObjectId;

    @Field() @Property({required: true})
    testName!: string;

    @Field() @Property({default: 50})
    testTimeout: number;

    @Field({nullable: true}) @Property({default: false})
    testMemoryLeaks: boolean;

    @Field({nullable: true}) @Property({default: false})
    testIsHidden: boolean;

    @Field(type => [String]) @Property({type: [String], default: []})
    testArguments: string[];

    @Field(type => Number) @Property({default: 0})
    testExitCode: number;

    @Field(type => File, {nullable: true}) @Property({ref: "File"})
    testInput: File;

    @Field(type => File, {nullable: true}) @Property({ref: "File"})
    testOutput: File;

    @Field(type => File, {nullable: true}) @Property({ref: "File"})
    testError: File;

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const TestSpecificationModel = getModelForClass(TestSpecification);

