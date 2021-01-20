import {Field as GraphQL, InputType} from "type-graphql";


@InputType()
export class SpecificationInput {

    @GraphQL()
    command: string;

    @GraphQL()
    timeout: number;

}

@InputType()
export class SpecificationFileUpload {

    @GraphQL()
    command: string;

    @GraphQL()
    timeout: number;

    @GraphQL(type => [String])
    requiredFiles!: string[];
}

