import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, prop as Mongoose} from "@typegoose/typegoose"
import {Course} from "./Course";
import {Brief} from "./Brief";
import {Specification} from "./Specification";
import {ObjectId} from "mongodb";

@ObjectType()
export class Assignment {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL()
    @Mongoose({required: true})
    assignmentName!: string;

    @GraphQL(type => Course)
    @Mongoose({required: true, ref: "Course"})
    assignmentCourse!: Course;

    @GraphQL()
    @Mongoose({required: true})
    assignmentDueDate!: string;

    @GraphQL()
    @Mongoose({required: true})
    assignmentLateDate!: string;

    @GraphQL()
    @Mongoose({default: false})
    assignmentIsAssigned!: boolean;

    @GraphQL()
    @Mongoose()
    assignmentBrief!: Brief;

    @GraphQL(type => Specification)
    @Mongoose({ref: () => Specification})
    assignmentSpecification!: Specification;

    @GraphQL({nullable: true})
    @Mongoose({default: Date.now})
    dateCreated: string
}

export const AssignmentModel = getModelForClass(Assignment);
