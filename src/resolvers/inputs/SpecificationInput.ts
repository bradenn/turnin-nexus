import {Field as GraphQL, InputType} from "type-graphql";


@InputType()
export class SpecificationInput {

    @GraphQL()
    specificationCompilationCommand: string;

    @GraphQL()
    specificationCompilationTimeout: number;

}

@InputType()
export class SpecificationFileUpload {

    @GraphQL()
    specificationCompilationCommand: string;

    @GraphQL()
    specificationCompilationTimeout: number;

    @GraphQL(type => [String])
    specificationRequiredFiles!: string[];
}

