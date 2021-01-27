import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, Ref} from "@typegoose/typegoose"
import {prop as Mongoose} from "@typegoose/typegoose/lib/prop";
import {File} from "./File";
import {Assignment} from "./Assignment";
import {User} from "./User";
import {Result} from "./Result";
import {ObjectId} from "mongodb";

@ObjectType()
export class Submission {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL(type => Assignment)
    @Mongoose({required: true, ref: () => Assignment})
    assignment!: Assignment;

    @GraphQL(type => User)
    @Mongoose({required: true, ref: () => User})
    owner!: User;

    @GraphQL(type => [File])
    @Mongoose({ref: "File", default: []})
    files!: Ref<File>[]

    @GraphQL(type => [Result])
    @Mongoose({ref: "Result", default: []})
    results: Ref<Result>[];

    @GraphQL(type => Boolean)
    @Mongoose({default: false, type: Boolean})
    passed: boolean

    @GraphQL(type => [String], {nullable: true})
    @Mongoose({type: [String]})
    stdout: string[];

    @GraphQL()
    @Mongoose({default: ""})
    duration: string

    @GraphQL()
    @Mongoose({default: Date.now})
    created: string
}

export const SubmissionModel = getModelForClass(Submission);

