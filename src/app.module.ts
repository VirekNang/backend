import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { MembershipModule } from '../modules/membership/membership.module';
import { CustomerModule } from './modules/customer/customer.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MembershipModule } from './modules/membership/membership.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { SalaryDetailModule } from './modules/salary-detail/salary-detail.module';
import { PaymentMethodModule } from './modules/payment-method/payment-method.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { ItemsModule } from './modules/items/items.module';
import { PromotionModule } from './modules/promotion/promotion.module';
import { SaleModule } from './modules/sale/sale.module';
import { SaleDetailModule } from './modules/sale-detail/sale-detail.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { PurchaseDetailModule } from './modules/purchase-detail/purchase-detail.module';
import { OpeningCashModule } from './modules/opening-cash/opening-cash.module';
import { ClosingCashModule } from './modules/closing-cash/closing-cash.module';
import { ExpenseModule } from './modules/expense/expense.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/auth/users/users.module';
import { DeviceModule } from './modules/device/device.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CustomerModule,
    BrandModule,
    CategoriesModule,
    MembershipModule,
    EmployeeModule,
    SalaryDetailModule,
    PaymentMethodModule,
    SupplierModule,
    ItemsModule,
    PromotionModule,
    SaleModule,
    SaleDetailModule,
    PurchaseModule,
    PurchaseDetailModule,
    OpeningCashModule,
    ClosingCashModule,
    ExpenseModule,
    AuthModule,
     UsersModule,
     DeviceModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
