import {Field as GraphQL, InputType} from "type-graphql";


@InputType()
export class AssignmentInput {
    @GraphQL()
    name: string;

    @GraphQL()
    course: string;

    @GraphQL()
    due: string;

    @GraphQL()
    late: string;
}
