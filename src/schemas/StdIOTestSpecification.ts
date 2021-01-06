import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property} from "@typegoose/typegoose"
import {File} from "./File"

@ObjectType()
export class StdIOTestSpecification {
    @Field() @Property({required: true})
    testName!: string;

    @Field() @Property({default: 5000})
    testTimeout!: number;

    @Field() @Property({default: false})
    testMemoryLeaks!: boolean;

    @Field() @Property({default: false})
    testIsHidden!: boolean;

    @Field(type => [String]) @Property({type: [String], required: true})
    testArguments!: string[];

    @Field(type => Number) @Property({required: true})
    testExitCode!: number;

    @Field(type => File) @Property({ref: () => File})
    testInput: File;

    @Field(type => File) @Property({ref: () => File})
    testOutput: File;

    @Field(type => File) @Property({ref: () => File})
    testError: File;

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const StdIOTestSpecificationModel = getModelForClass(StdIOTestSpecification);

