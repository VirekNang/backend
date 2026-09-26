import { Prisma } from '@prisma/client';
import { CustomerDto } from './dto/customer.dto';
import { PrismaService } from '../../prisma/prisma.service';
export declare class CustomerService {
    private prisma;
    constructor(prisma: PrismaService);
    GetAll(): Prisma.PrismaPromise<{
        CustomerName: string;
        Phone: string;
        MembershipID: number | null;
        Gender: string;
        Address: string;
        rewardPoints: number;
        Note: string;
        uuid: string;
        CustomerID: number;
        CustomerNo: string;
        CreatedDate: Date;
        UpdatedDate: Date;
    }[]>;
    GetById(id: string): Promise<({
        membership: {
            MembershipID: number;
            uuid: string;
            CreatedDate: Date;
            UpdatedDate: Date;
            Description: string | null;
            MembershipName: string;
            DiscountRate: Prisma.Decimal;
            MinPoints: number;
        } | null;
    } & {
        CustomerName: string;
        Phone: string;
        MembershipID: number | null;
        Gender: string;
        Address: string;
        rewardPoints: number;
        Note: string;
        uuid: string;
        CustomerID: number;
        CustomerNo: string;
        CreatedDate: Date;
        UpdatedDate: Date;
    }) | null>;
    Create(customer: CustomerDto): Promise<{
        CustomerName: string;
        Phone: string;
        MembershipID: number | null;
        Gender: string;
        Address: string;
        rewardPoints: number;
        Note: string;
        uuid: string;
        CustomerID: number;
        CustomerNo: string;
        CreatedDate: Date;
        UpdatedDate: Date;
    }>;
    Update(id: string, customer: CustomerDto): Promise<{
        CustomerName: string;
        Phone: string;
        MembershipID: number | null;
        Gender: string;
        Address: string;
        rewardPoints: number;
        Note: string;
        uuid: string;
        CustomerID: number;
        CustomerNo: string;
        CreatedDate: Date;
        UpdatedDate: Date;
    }>;
    Delete(id: string): Promise<{
        CustomerName: string;
        Phone: string;
        MembershipID: number | null;
        Gender: string;
        Address: string;
        rewardPoints: number;
        Note: string;
        uuid: string;
        CustomerID: number;
        CustomerNo: string;
        CreatedDate: Date;
        UpdatedDate: Date;
    }>;
}
