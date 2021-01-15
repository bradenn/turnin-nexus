import {Field, InputType} from "type-graphql";


@InputType()
export class SpecificationInput {

    @Field()
    specificationCompilationCommand: string;

    @Field()
    specificationCompilationTimeout: number;

}

@InputType()
export class SpecificationFileUpload {

    @Field()
    specificationCompilationCommand: string;

    @Field()
    specificationCompilationTimeout: number;

    @Field(type => [String])
    specificationRequiredFiles!: string[];
}

