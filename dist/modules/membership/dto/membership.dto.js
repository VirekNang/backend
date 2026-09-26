"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMembershipDto = exports.CreateMembershipDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateMembershipDto {
    MembershipName;
    DiscountRate;
    MinPoints;
    Description;
}
exports.CreateMembershipDto = CreateMembershipDto;
__decorate([
    (0, swagger_2.ApiProperty)({ example: 'Gold' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateMembershipDto.prototype, "MembershipName", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 10 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMembershipDto.prototype, "DiscountRate", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 500 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMembershipDto.prototype, "MinPoints", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ example: 'Members receive a 10% discount.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateMembershipDto.prototype, "Description", void 0);
class UpdateMembershipDto extends (0, swagger_1.PartialType)(CreateMembershipDto) {
}
exports.UpdateMembershipDto = UpdateMembershipDto;
//# sourceMappingURL=membership.dto.js.map