import {Field as GraphQL, InputType} from "type-graphql";


@InputType()
export class AssignmentInput {
    @GraphQL()
    assignmentName: string;

    @GraphQL()
    assignmentCourse: string;

    @GraphQL()
    assignmentDueDate: string;

    @GraphQL()
    assignmentLateDate: string;
}
