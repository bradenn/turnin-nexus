import {Field as GraphQL, InputType} from "type-graphql";


@InputType()
export class CourseInput {
    @GraphQL()
    name: string;

    @GraphQL()
    section: number;

    @GraphQL()
    description: string;
}
