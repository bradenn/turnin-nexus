import {Course} from "../../schemas/Course";
import {Field, InputType} from "type-graphql";



@InputType()
export class CourseInput {
    @Field()
    courseName: string;

    @Field()
    courseSection: number;

    @Field()
    courseDescription: string;
}
