import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property} from "@typegoose/typegoose"
import {Course} from "./Course";
import {Brief} from "./Brief";
import {StdIOAssignment} from "./StdIOAssignment";
import {ObjectId} from "mongodb";

@ObjectType()
export class Assignment {

    @Field()
    readonly _id: ObjectId;

    @Field() @Property({required: true})
    assignmentName!: string;

    @Field(type => Course) @Property({required: true, ref: () => Course})
    assignmentCourse!: Course;

    @Field() @Property({required: true})
    assignmentDueDate!: string;

    @Field() @Property({required: true})
    assignmentLateDate!: string;

    @Field() @Property({default: false})
    assignmentIsAssigned!: boolean;

    @Field() @Property()
    assignmentBrief!: Brief;

    @Field(type => StdIOAssignment) @Property({ref: () => StdIOAssignment})
    assignmentSpecifications: StdIOAssignment;

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const AssignmentModel = getModelForClass(Assignment);
