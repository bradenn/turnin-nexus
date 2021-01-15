import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property} from "@typegoose/typegoose"
import {File} from "./File";
import {TestSpecification} from "./TestSpecification";
import {ObjectId} from "mongodb";

@ObjectType()
export class Specification {

    @Field()
    readonly _id: ObjectId;

    @Field() @Property({required: true, default: "make"})
    specificationCompilationCommand!: string;

    @Field() @Property({default: 5000})
    specificationCompilationTimeout!: number;

    @Field(type => [String]) @Property({type: [String], default: []})
    specificationRequiredFiles!: string[];

    @Field(type => [File]) @Property({ref: "File", default: []})
    specificationProvidedFiles!: File[]

    @Field(type => [TestSpecification]) @Property({ref: "TestSpecification", default: []})
    specificationTests: TestSpecification[];

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const SpecificationModel = getModelForClass(Specification);
