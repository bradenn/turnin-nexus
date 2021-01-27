import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, prop as Mongoose} from "@typegoose/typegoose"
import {File} from "./File"
import {ObjectId} from "mongodb";

@ObjectType()
export class Test {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL()
    @Mongoose({required: true})
    name!: string;

    @GraphQL()
    @Mongoose({default: 50})
    timeout: number;

    @GraphQL({nullable: true})
    @Mongoose({default: false})
    leaks: boolean;

    @GraphQL({nullable: true})
    @Mongoose({default: false})
    hidden: boolean;

    @GraphQL(type => [String])
    @Mongoose({type: [String], default: []})
    args: string[];

    @GraphQL(type => [String])
    @Mongoose({type: [String], default: []})
    env: string[];

    @GraphQL(type => Number)
    @Mongoose({default: 0})
    exit: number;

    @GraphQL(type => File, {nullable: true})
    @Mongoose({ref: "File"})
    stdin: File;

    @GraphQL(type => File, {nullable: true})
    @Mongoose({ref: "File"})
    stdout: File;

    @GraphQL(type => File, {nullable: true})
    @Mongoose({ref: "File"})
    stderr: File;

    @GraphQL()
    @Mongoose({default: Date.now})
    created: string
}

export const TestSpecificationModel = getModelForClass(Test);

