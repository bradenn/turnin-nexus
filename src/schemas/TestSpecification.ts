import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, prop as Mongoose} from "@typegoose/typegoose"
import {File} from "./File"
import {ObjectId} from "mongodb";

@ObjectType()
export class TestSpecification {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL()
    @Mongoose({required: true})
    testName!: string;

    @GraphQL()
    @Mongoose({default: 50})
    testTimeout: number;

    @GraphQL({nullable: true})
    @Mongoose({default: false})
    testMemoryLeaks: boolean;

    @GraphQL({nullable: true})
    @Mongoose({default: false})
    testIsHidden: boolean;

    @GraphQL(type => [String])
    @Mongoose({type: [String], default: []})
    testArguments: string[];

    @GraphQL(type => Number)
    @Mongoose({default: 0})
    testExitCode: number;

    @GraphQL(type => File, {nullable: true})
    @Mongoose({ref: "File"})
    testInput: File;

    @GraphQL(type => File, {nullable: true})
    @Mongoose({ref: "File"})
    testOutput: File;

    @GraphQL(type => File, {nullable: true})
    @Mongoose({ref: "File"})
    testError: File;

    @GraphQL()
    @Mongoose({default: Date.now})
    dateCreated: string
}

export const TestSpecificationModel = getModelForClass(TestSpecification);

