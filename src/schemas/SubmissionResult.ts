import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, prop as Mongoose} from "@typegoose/typegoose"
import {ObjectId} from "mongodb";
import {TestSpecification} from "./TestSpecification";

@ObjectType()
export class SubmissionResult {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL(type => TestSpecification)
    @Mongoose({required: true, ref: "TestSpecification"})
    resultTest!: TestSpecification

    @GraphQL({nullable: false})
    @Mongoose({default: false})
    testPassed: boolean;

    @GraphQL()
    @Mongoose({default: 0})
    memoryUsed: number

    @GraphQL()
    @Mongoose({default: 0})
    exitCode: number

    @GraphQL(type => String)
    @Mongoose({default: "0ms"})
    testElapsedTime: string

    @GraphQL(type => [String], {nullable: true})
    @Mongoose({type: [String]})
    testOutput: string[];

    @GraphQL(type => [String], {nullable: true})
    @Mongoose({type: [String]})
    testError: string[];

    @GraphQL()
    @Mongoose({default: Date.now})
    created: string
}

export const SubmissionResultModel = getModelForClass(SubmissionResult);

