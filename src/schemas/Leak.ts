import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, prop as Mongoose} from "@typegoose/typegoose"
import {ObjectId} from "mongodb";

@ObjectType()
export class Leak {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL({nullable: false})
    @Mongoose({default: false})
    passed: boolean;

    @GraphQL()
    @Mongoose({default: "0ms"})
    elapsed: string

    @GraphQL()
    @Mongoose({default: 0})
    bytesLost: number

    @GraphQL()
    @Mongoose({default: 0})
    blocksLost: number

    @GraphQL()
    @Mongoose({default: 0})
    allocs: number

    @GraphQL()
    @Mongoose({default: 0})
    frees: number

    @GraphQL()
    @Mongoose({default: 0})
    allBytes: number

    @GraphQL(type => [String], {nullable: true})
    @Mongoose({type: [String]})
    leaks: string[];

}

export const SubmissionResultModel = getModelForClass(Leak);

