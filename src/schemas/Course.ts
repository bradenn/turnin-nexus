import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, prop as Mongoose} from "@typegoose/typegoose"
import {User} from "./User";
import {ObjectId} from "mongodb";

@ObjectType()
export class Course {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL()
    @Mongoose({required: true})
    name!: string;

    @GraphQL()
    @Mongoose({required: true})
    section!: number;

    @GraphQL()
    @Mongoose()
    description!: string;

    @GraphQL(type => User)
    @Mongoose({required: true, ref: "User"})
    instructor!: User

    @GraphQL()
    @Mongoose({default: false})
    locked!: boolean

    @GraphQL()
    @Mongoose({default: Date.now})
    created: string
}

export const CourseModel = getModelForClass(Course);
