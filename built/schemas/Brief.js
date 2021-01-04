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
import { getModelForClass, prop } from "@typegoose/typegoose";
import { File } from "./File";
let Brief = class Brief {
};
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", String)
], Brief.prototype, "briefTitle", void 0);
__decorate([
    Field(),
    prop(),
    __metadata("design:type", String)
], Brief.prototype, "briefDesc", void 0);
__decorate([
    Field(type => File),
    prop({ required: true, ref: () => File }),
    __metadata("design:type", File)
], Brief.prototype, "briefMarkdownFile", void 0);
__decorate([
    Field(),
    prop({ default: Date.now }),
    __metadata("design:type", String)
], Brief.prototype, "dateCreated", void 0);
Brief = __decorate([
    ObjectType()
], Brief);
export { Brief };
export const BriefModel = getModelForClass(Brief);
