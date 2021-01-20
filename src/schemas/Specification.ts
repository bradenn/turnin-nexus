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
    specificationCompilationCommand!: string;

    @GraphQL()
    @Mongoose({default: 5000})
    specificationCompilationTimeout!: number;

    @GraphQL(type => [String])
    @Mongoose({type: [String], default: []})
    specificationRequiredFiles!: string[];

    @GraphQL(type => [File])
    @Mongoose({ref: "File", default: []})
    specificationProvidedFiles!: File[]

    @GraphQL(type => [TestSpecification])
    @Mongoose({ref: "TestSpecification", default: []})
    specificationTests: TestSpecification[];

    @GraphQL()
    @Mongoose({default: Date.now})
    dateCreated: string
}

export const SpecificationModel = getModelForClass(Specification);
