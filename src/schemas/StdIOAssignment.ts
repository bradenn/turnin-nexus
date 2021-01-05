import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property, Ref} from "@typegoose/typegoose"
import {File} from "./File";
import {StdIOTestSpecification} from "./StdIOTestSpecification";

@ObjectType()
export class StdIOAssignment {
    @Field() @Property({required: true})
    compilationCommand!: string;

    @Field() @Property({default: 5000})
    compilationTimeout!: number;

    @Field() @Property({required: true})
    assignmentRequiredFiles!: string[];

    @Field(type => [File]) @Property({ref: "File", default: []})
    assignmentProvidedFiles!: Ref<File>[]

    @Field(type => [StdIOTestSpecification]) @Property({ref: "StdIOTestSpecification", default: []})
    assignmentTests!: Ref<StdIOTestSpecification>[];

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const StdIOAssignmentModel = getModelForClass(StdIOAssignment);
