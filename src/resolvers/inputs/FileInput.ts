import {Field as GraphQL} from "type-graphql";
import * as Stream from "stream";


export class FileInput {
    @GraphQL(type => Stream) // <<== the problem
    stream?: Stream;

    @GraphQL() filename: string;

    @GraphQL() mimetype: string;

    @GraphQL() encoding: string;
}
