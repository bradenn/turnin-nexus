import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop} from "@typegoose/typegoose"
import {Course} from "./Course";
import {Brief} from "./Brief";
import {StdIOAssignment} from "./StdIOAssignment";

@ObjectType()
export class Assignment {
    @Field() @prop({required: true})
    assignmentName!: string;

    @Field(type => Course) @prop({required: true, ref: () => Course})
    assignmentCourse!: Course;

    @Field() @prop({required: true})
    assignmentDueDate!: string;

    @Field() @prop({required: true})
    assignmentLateDate!: string;

    @Field() @prop({default: false})
    assignmentIsAssigned!: boolean;

    @Field() @prop()
    assignmentBrief!: Brief;

    @Field(type => StdIOAssignment) @prop({ref: () => StdIOAssignment})
    assignmentSpecifications: StdIOAssignment;

    @Field() @prop({default: Date.now})
    dateCreated: string
}

export const AssignmentModel = getModelForClass(Assignment);
