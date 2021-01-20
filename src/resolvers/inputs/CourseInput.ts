import {Field as GraphQL, InputType} from "type-graphql";


@InputType()
export class CourseInput {
    @GraphQL()
    courseName: string;

    @GraphQL()
    courseSection: number;

    @GraphQL()
    courseDescription: string;
}
