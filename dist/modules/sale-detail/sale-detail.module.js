"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleDetailModule = void 0;
const common_1 = require("@nestjs/common");
const sale_detail_controller_1 = require("./sale-detail.controller");
const sale_detail_service_1 = require("./sale-detail.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let SaleDetailModule = class SaleDetailModule {
};
exports.SaleDetailModule = SaleDetailModule;
exports.SaleDetailModule = SaleDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [sale_detail_controller_1.SaleDetailController],
        providers: [sale_detail_service_1.SaleDetailService]
    })
], SaleDetailModule);
//# sourceMappingURL=sale-detail.module.js.map