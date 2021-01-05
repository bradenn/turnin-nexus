import {Arg, Ctx, Query, Resolver} from "type-graphql";
import assignmentService from "../services/AssignmentService";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {Assignment} from "../schemas/Assignment";

@Resolver(of => Assignment)
export class AssignmentResolver {

    @Query(returns => Assignment)
    async assignment(@Ctx() {userId}: Context,
                     @Arg("assignmentId", type => ObjectIdScalar) assignmentId: ObjectId): Promise<Assignment> {
        return await assignmentService.getAssignment(assignmentId, userId)
    }

}

