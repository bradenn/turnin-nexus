import {Field, InputType} from "type-graphql";
import * as Stream from "stream";


export class FileInput {
    @Field(type => Stream) // <<== the problem
    stream?: Stream;

    @Field() filename: string;

    @Field() mimetype: string;

    @Field() encoding: string;
}
