import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop} from "@typegoose/typegoose"
import {prop as Property} from "@typegoose/typegoose/lib/prop";

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

    @Field() @Property({required: true})
    testArguments!: string[];

    @Field() @Property({required: true})
    testExitCode!: string[];

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

