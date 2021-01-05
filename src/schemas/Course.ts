import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property} from "@typegoose/typegoose"
import {User} from "./User";

@ObjectType()
export class Course {
    @Field() @Property({required: true})
    courseName!: string;

    @Field() @Property({required: true})
    courseSection!: number;

    @Field(type => User) @Property({required: true, ref: () => User})
    courseInstructor!: User

    @Field() @Property({default: false})
    courseIsLocked!: boolean

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const CourseModel = getModelForClass(Course);
