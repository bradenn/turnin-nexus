import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, prop as Mongoose} from "@typegoose/typegoose"
import {File} from "./File";
import {TestSpecification} from "./TestSpecification";
import {ObjectId} from "mongodb";

@ObjectType()
export class Specification {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL()
    @Mongoose({required: true, default: "make"})
    command!: string;

    @GraphQL()
    @Mongoose({default: 5000})
    timeout!: number;

    @GraphQL(type => [String])
    @Mongoose({type: [String], default: []})
    requiredFiles!: string[];

    @GraphQL(type => [File])
    @Mongoose({ref: "File", default: []})
    providedFiles!: File[]

    @GraphQL(type => [TestSpecification])
    @Mongoose({ref: "TestSpecification", default: []})
    tests: TestSpecification[];

    @GraphQL()
    @Mongoose({default: Date.now})
    created: string
}

export const SpecificationModel = getModelForClass(Specification);
