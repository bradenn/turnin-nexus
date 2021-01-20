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
    courseName!: string;

    @GraphQL()
    @Mongoose({required: true})
    courseSection!: number;

    @GraphQL()
    @Mongoose()
    courseDescription!: string;

    @GraphQL(type => User)
    @Mongoose({required: true, ref: "User"})
    courseInstructor!: User

    @GraphQL()
    @Mongoose({default: false})
    courseIsLocked!: boolean

    @GraphQL()
    @Mongoose({default: Date.now})
    created: string
}

export const CourseModel = getModelForClass(Course);
