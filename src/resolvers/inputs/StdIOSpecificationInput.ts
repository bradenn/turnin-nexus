import {Field, InputType} from "type-graphql";


@InputType()
export class StdIOSpecificationInput {

    @Field()
    specificationCompilationCommand: string;

    @Field()
    specificationCompilationTimeout: number;

    @Field(type => [String])
    specificationRequiredFiles!: string[];
}
