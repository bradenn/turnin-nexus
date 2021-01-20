import {Field as GraphQL, ObjectType} from "type-graphql"
import {getModelForClass, pre, prop as Mongoose, Ref} from "@typegoose/typegoose"
import {Course} from "./Course";
import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";

function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) reject(new Error(err));
            resolve(hash);
        });
    });
}

@ObjectType()
@pre<User>('save', function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    hashPassword(user.password).then(hash => {
        user.password = hash;
        next();
    }).catch(_ => {
    });
})

export class User {

    @GraphQL()
    readonly _id: ObjectId;

    @GraphQL()
    @Mongoose({required: true})
    username!: string;

    @GraphQL()
    @Mongoose({required: true})
    email!: string;

    @GraphQL()
    @Mongoose({required: true})
    firstname!: string

    @GraphQL()
    @Mongoose({required: true})
    lastname!: string

    @GraphQL()
    @Mongoose({required: true})
    password!: string

    @GraphQL()
    @Mongoose({required: true, default: 'student'})
    account!: string

    @GraphQL(type => [Course], {nullable: true})
    @Mongoose({ref: "Course", default: []})
    courses!: Ref<Course>[]

    @GraphQL()
    @Mongoose({default: Date.now})
    dateCreated: string

}

export const UserModel = getModelForClass(User);

