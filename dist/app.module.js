"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const customer_module_1 = require("./modules/customer/customer.module");
const brand_module_1 = require("./modules/brand/brand.module");
const categories_module_1 = require("./modules/categories/categories.module");
const membership_module_1 = require("./modules/membership/membership.module");
const employee_module_1 = require("./modules/employee/employee.module");
const salary_detail_module_1 = require("./modules/salary-detail/salary-detail.module");
const payment_method_module_1 = require("./modules/payment-method/payment-method.module");
const supplier_module_1 = require("./modules/supplier/supplier.module");
const items_module_1 = require("./modules/items/items.module");
const promotion_module_1 = require("./modules/promotion/promotion.module");
const sale_module_1 = require("./modules/sale/sale.module");
const sale_detail_module_1 = require("./modules/sale-detail/sale-detail.module");
const purchase_module_1 = require("./modules/purchase/purchase.module");
const purchase_detail_module_1 = require("./modules/purchase-detail/purchase-detail.module");
const opening_cash_module_1 = require("./modules/opening-cash/opening-cash.module");
const closing_cash_module_1 = require("./modules/closing-cash/closing-cash.module");
const expense_module_1 = require("./modules/expense/expense.module");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/auth/users/users.module");
const device_module_1 = require("./modules/device/device.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            customer_module_1.CustomerModule,
            brand_module_1.BrandModule,
            categories_module_1.CategoriesModule,
            membership_module_1.MembershipModule,
            employee_module_1.EmployeeModule,
            salary_detail_module_1.SalaryDetailModule,
            payment_method_module_1.PaymentMethodModule,
            supplier_module_1.SupplierModule,
            items_module_1.ItemsModule,
            promotion_module_1.PromotionModule,
            sale_module_1.SaleModule,
            sale_detail_module_1.SaleDetailModule,
            purchase_module_1.PurchaseModule,
            purchase_detail_module_1.PurchaseDetailModule,
            opening_cash_module_1.OpeningCashModule,
            closing_cash_module_1.ClosingCashModule,
            expense_module_1.ExpenseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            device_module_1.DeviceModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map