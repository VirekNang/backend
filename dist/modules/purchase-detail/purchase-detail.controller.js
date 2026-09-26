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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseDetailController = void 0;
const common_1 = require("@nestjs/common");
const purchase_detail_service_1 = require("./purchase-detail.service");
let PurchaseDetailController = class PurchaseDetailController {
    purchaseDetailService;
    constructor(purchaseDetailService) {
        this.purchaseDetailService = purchaseDetailService;
    }
    getAll(purchaseId) {
        if (purchaseId) {
            return this.purchaseDetailService.GetByPurchase(parseInt(purchaseId, 10));
        }
        return this.purchaseDetailService.Get();
    }
    getById(id) {
        return this.purchaseDetailService.GetById(id);
    }
    create(body) {
        return this.purchaseDetailService.Create(body);
    }
    update(id, body) {
        return this.purchaseDetailService.Update(id, body);
    }
    delete(id) {
        return this.purchaseDetailService.Delete(id);
    }
};
exports.PurchaseDetailController = PurchaseDetailController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('purchaseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseDetailController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PurchaseDetailController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PurchaseDetailController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PurchaseDetailController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PurchaseDetailController.prototype, "delete", null);
exports.PurchaseDetailController = PurchaseDetailController = __decorate([
    (0, common_1.Controller)('purchase-detail'),
    __metadata("design:paramtypes", [purchase_detail_service_1.PurchaseDetailService])
], PurchaseDetailController);
//# sourceMappingURL=purchase-detail.controller.js.map