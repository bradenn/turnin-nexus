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
import { StdIOTestSpecification } from "./StdIOTestSpecification";
let StdIOAssignment = class StdIOAssignment {
};
__decorate([
    Field(),
    Property({ required: true }),
    __metadata("design:type", String)
], StdIOAssignment.prototype, "compilationCommand", void 0);
__decorate([
    Field(),
    Property({ default: 5000 }),
    __metadata("design:type", Number)
], StdIOAssignment.prototype, "compilationTimeout", void 0);
__decorate([
    Field(),
    Property({ required: true }),
    __metadata("design:type", Array)
], StdIOAssignment.prototype, "assignmentRequiredFiles", void 0);
__decorate([
    Field(type => [File]),
    Property({ ref: "File", default: [] }),
    __metadata("design:type", Array)
], StdIOAssignment.prototype, "assignmentProvidedFiles", void 0);
__decorate([
    Field(type => [StdIOTestSpecification]),
    Property({ ref: "StdIOTestSpecification", default: [] }),
    __metadata("design:type", Array)
], StdIOAssignment.prototype, "assignmentTests", void 0);
__decorate([
    Field(),
    Property({ default: Date.now }),
    __metadata("design:type", String)
], StdIOAssignment.prototype, "dateCreated", void 0);
StdIOAssignment = __decorate([
    ObjectType()
], StdIOAssignment);
export { StdIOAssignment };
export const StdIOAssignmentModel = getModelForClass(StdIOAssignment);
