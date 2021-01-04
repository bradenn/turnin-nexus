import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop} from "@typegoose/typegoose"
import {User} from "./User";

@ObjectType()
export class Course {
    @Field() @prop({required: true})
    courseName!: string;

    @Field() @prop({required: true})
    courseSection!: number;

    @Field(type => User) @prop({required: true, ref: () => User})
    courseInstructor!: User

    @Field() @prop({default: false})
    courseIsLocked!: boolean

    @Field() @prop({default: Date.now})
    dateCreated: string
}

export const CourseModel = getModelForClass(Course);
