import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, prop as Mongoose} from "@typegoose/typegoose"
import {ObjectId} from "mongodb";
import {Test} from "./Test";
import {Leak} from "./Leak";
import {Ref} from "typegoose";

@ObjectType()
export class Result {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL(type => Test)
    @Mongoose({required: true, ref: "Test"})
    test!: Test

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

    @GraphQL(type => [String], {nullable: true})
    @Mongoose({type: [String]})
    diffout: string[];

    @GraphQL(type => [String], {nullable: true})
    @Mongoose({type: [String]})
    differr: string[];

    @GraphQL(type => Leak, {nullable: true})
    @Mongoose({required: false, ref: "Leak"})
    leak: Ref<Leak>

    @GraphQL()
    @Mongoose({default: Date.now})
    created: string
}

export const SubmissionResultModel = getModelForClass(Result);

