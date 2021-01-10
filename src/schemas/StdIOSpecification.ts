import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property, Ref} from "@typegoose/typegoose"
import {File} from "./File";
import {StdIOTestSpecification} from "./StdIOTestSpecification";
import {ObjectId} from "mongodb";

@ObjectType()
export class StdIOSpecification {

    @Field()
    readonly _id: ObjectId;

    @Field() @Property({required: true})
    specificationCompilationCommand!: string;

    @Field() @Property({default: 5000})
    specificationCompilationTimeout!: number;

    @Field(type => [String]) @Property({type: [String], default: []})
    specificationRequiredFiles!: string[];

    @Field(type => [File]) @Property({ref: "File", default: []})
    specificationProvidedFiles!: File[]

    @Field(type => [StdIOTestSpecification]) @Property({ref: "StdIOTestSpecification", default: []})
    specificationTests: StdIOTestSpecification[];

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const StdIOSpecificationModel = getModelForClass(StdIOSpecification);
