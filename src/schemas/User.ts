import {Field, ObjectType} from "type-graphql"
import {getModelForClass, prop as Property, Ref} from "@typegoose/typegoose"
import {ObjectId} from "mongoose";
import {Course} from "./Course";

@ObjectType()
export class User {
    @Field()
    readonly _id: string;

    @Field() @Property({required: true})
    username!: string;

    @Field() @Property({required: true})
    email!: number;

    @Field() @Property({required: true})
    firstname!: string

    @Field() @Property({required: true})
    lastname!: string

    @Field() @Property({required: true})
    password!: string

    @Field(type => [Course]) @Property({ref: "Course", default: []})
    courses!: Ref<Course>[]

    @Field() @Property({default: Date.now})
    dateCreated: string
}

export const UserModel = getModelForClass(User);

UserModel.statics.authenticate = (username, password) => {
    return new Promise((resolve, reject) => {
        UserModel.findOne({"username": username})
            .then(user => {
                if (!user) reject(new Error("User not found"))

                verifyHash(password, user.password).then(() => {
                    return resolve(user);
                }).catch((er) => {

                    let err = new Error("An account could not be found using that email/password.");
                    return reject(err);
                });
            });
    });
};

UserModel.pre('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) return next();
    user.password = await hashPassword(user.password);
    next();
});





