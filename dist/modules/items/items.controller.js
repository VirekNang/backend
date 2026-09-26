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
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("./items.service");
const swagger_1 = require("@nestjs/swagger");
let ItemsController = class ItemsController {
    itemService;
    constructor(itemService) {
        this.itemService = itemService;
    }
    GetAll() {
        return this.itemService.Get();
    }
    GetBestSellers(days, limit) {
        return this.itemService.GetBestSellers(Number(days), Number(limit));
    }
    GetById(id) {
        return this.itemService.GetByid(id);
    }
    Create(request) {
        return this.itemService.Create(request);
    }
    Update(id, request) {
        return this.itemService.Update(id, request);
    }
    Delete(id) {
        return this.itemService.Delete(id);
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "GetAll", null);
__decorate([
    (0, common_1.Get)('best-sellers'),
    __param(0, (0, common_1.Query)('days')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "GetBestSellers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "GetById", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                ItemName: { type: 'string' },
                CategoryID: { type: 'number' },
                BrandID: { type: 'number' },
                UnitPrice: { type: 'number' },
                SalePrice: { type: 'number' },
                StockQuantity: { type: 'number' },
                Description: { type: 'string' },
                Image: { type: 'string', format: 'binary' },
                Barcode: { type: 'string' },
                UnitOfMeasure: { type: 'string' },
                IsActive: { type: 'boolean' },
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "Create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                ItemName: { type: 'string' },
                CategoryID: { type: 'number' },
                BrandID: { type: 'number' },
                UnitPrice: { type: 'number' },
                SalePrice: { type: 'number' },
                StockQuantity: { type: 'number' },
                Description: { type: 'string' },
                Image: { type: 'string', format: 'binary' },
                Barcode: { type: 'string' },
                UnitOfMeasure: { type: 'string' },
                IsActive: { type: 'boolean' },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "Update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ItemsController.prototype, "Delete", null);
exports.ItemsController = ItemsController = __decorate([
    (0, common_1.Controller)('items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
//# sourceMappingURL=items.controller.js.map