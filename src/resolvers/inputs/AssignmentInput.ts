import {Field, InputType} from "type-graphql";


@InputType()
export class AssignmentInput {
    @Field()
    assignmentName: string;

    @Field()
    assignmentCourse: string;

    @Field()
    assignmentDueDate: string;

    @Field()
    assignmentLateDate: string;
}
