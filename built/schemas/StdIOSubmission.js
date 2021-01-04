var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, ObjectType } from "type-graphql";
import { getModelForClass } from "@typegoose/typegoose";
import { prop as Property } from "@typegoose/typegoose/lib/prop";
import { File } from "./File";
import { Assignment } from "./Assignment";
import { User } from "./User";
import { StdIOSubmissionResult } from "./StdIOSubmissionResult";
let StdIOSubmission = class StdIOSubmission {
};
__decorate([
    Field(type => Assignment),
    Property({ required: true, ref: () => Assignment }),
    __metadata("design:type", Assignment)
], StdIOSubmission.prototype, "submissionAssignment", void 0);
__decorate([
    Field(type => User),
    Property({ required: true, ref: () => User }),
    __metadata("design:type", User)
], StdIOSubmission.prototype, "submissionOwner", void 0);
__decorate([
    Field(type => [File]),
    Property({ ref: "File", default: [] }),
    __metadata("design:type", Array)
], StdIOSubmission.prototype, "submissionFiles", void 0);
__decorate([
    Field(type => [StdIOSubmissionResult]),
    Property({ ref: "StdIOSubmissionResult", default: [] }),
    __metadata("design:type", Array)
], StdIOSubmission.prototype, "submissionResults", void 0);
__decorate([
    Field(),
    Property({ default: Date.now }),
    __metadata("design:type", String)
], StdIOSubmission.prototype, "dateCreated", void 0);
StdIOSubmission = __decorate([
    ObjectType()
], StdIOSubmission);
export { StdIOSubmission };
export const StdIOSubmissionModel = getModelForClass(StdIOSubmission);
