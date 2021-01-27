import {Arg, Ctx, FieldResolver, Query, Resolver, Root} from "type-graphql";
import userService from "../services/UserService";
import {Course} from "../schemas/Course";
import {Context} from "../schemas/Interfaces";
import {ObjectIdScalar} from "../schemas/ScalarObjectId";
import {ObjectId} from "mongodb";
import {User} from "../schemas/User";

@Resolver(of => User)
export class UserResolver {

    @Query(returns => User)
    async user(@Ctx() {userId}: Context,
               @Arg("targetId", type => ObjectIdScalar) targetId: ObjectId): Promise<User> {
        return await userService.getUser(targetId)
    }

    @Query(returns => User)
    async self(@Ctx() {userId}: Context): Promise<User> {
        return await userService.getUser(userId)
    }

    @Query(returns => User)
    async userSelf(@Ctx() {userId}: Context): Promise<User> {
        return await userService.getUser(userId)
    }

    @FieldResolver()
    async courses(@Root() user: User): Promise<Course[]> {
        return await userService.getCourses(user._id);
    }

    @FieldResolver(returns => String)
    async fullName(@Root() user: User): Promise<String> {
        return `${user.firstname} ${user.lastname}`;
    }

}

