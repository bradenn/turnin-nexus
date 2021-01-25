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
    test!: TestSpecification

    @GraphQL({nullable: false})
    @Mongoose({default: false})
    passed: boolean;

    @GraphQL()
    @Mongoose({default: 0})
    memory: number

    @GraphQL()
    @Mongoose({default: 0})
    exit: number

    @GraphQL(type => String)
    @Mongoose({default: "0ms"})
    duration: string

    @GraphQL(type => [String], {nullable: true})
    @Mongoose({type: [String]})
    stdout: string[];

    @GraphQL(type => [String], {nullable: true})
    @Mongoose({type: [String]})
    stderr: string[];

    @GraphQL()
    @Mongoose({default: Date.now})
    created: string
}

export const SubmissionResultModel = getModelForClass(SubmissionResult);

