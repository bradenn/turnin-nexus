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
    name!: string;

    @GraphQL(type => Course)
    @Mongoose({required: true, ref: "Course"})
    course!: Course;

    @GraphQL()
    @Mongoose({required: true})
    due!: string;

    @GraphQL()
    @Mongoose({required: true})
    late!: string;

    @GraphQL()
    @Mongoose({default: false})
    assigned!: boolean;

    @GraphQL()
    @Mongoose()
    brief!: Brief;

    @GraphQL(type => Specification)
    @Mongoose({ref: () => Specification})
    specification!: Specification;

    @GraphQL({nullable: true})
    @Mongoose({default: Date.now})
    created: string
}

export const AssignmentModel = getModelForClass(Assignment);
