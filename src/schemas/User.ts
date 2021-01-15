import {Field, ObjectType} from "type-graphql"
import {getModelForClass, pre, prop as Property, Ref} from "@typegoose/typegoose"
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

    @Field()
    readonly _id: ObjectId;

    @Field() @Property({required: true})
    username!: string;

    @Field() @Property({required: true})
    email!: string;

    @Field() @Property({required: true})
    firstname!: string

    @Field() @Property({required: true})
    lastname!: string

    @Field() @Property({required: true})
    password!: string

    @Field() @Property({required: true, default: 'student'})
    account!: string

    @Field(type => [Course], {nullable: true}) @Property({ref: "Course", default: []})
    courses!: Ref<Course>[]

    @Field() @Property({default: Date.now})
    dateCreated: string

}

export const UserModel = getModelForClass(User);

