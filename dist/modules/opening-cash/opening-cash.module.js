"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpeningCashModule = void 0;
const common_1 = require("@nestjs/common");
const opening_cash_controller_1 = require("./opening-cash.controller");
const opening_cash_service_1 = require("./opening-cash.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let OpeningCashModule = class OpeningCashModule {
};
exports.OpeningCashModule = OpeningCashModule;
exports.OpeningCashModule = OpeningCashModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [opening_cash_controller_1.OpeningCashController],
        providers: [opening_cash_service_1.OpeningCashService],
    })
], OpeningCashModule);
//# sourceMappingURL=opening-cash.module.js.map