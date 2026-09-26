import { Prisma } from '@prisma/client';
import { CreateMembershipDto, UpdateMembershipDto } from './dto/membership.dto';
import { PrismaService } from '../../prisma/prisma.service';
export declare class MembershipService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    GetAll(): Prisma.PrismaPromise<{
        MembershipID: number;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        MembershipName: string;
        DiscountRate: Prisma.Decimal;
        MinPoints: number;
    }[]>;
    GetById(id: string): Prisma.Prisma__MembershipClient<{
        MembershipID: number;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        MembershipName: string;
        DiscountRate: Prisma.Decimal;
        MinPoints: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    Create(membership: CreateMembershipDto): Prisma.Prisma__MembershipClient<{
        MembershipID: number;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        MembershipName: string;
        DiscountRate: Prisma.Decimal;
        MinPoints: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    Update(id: string, membership: UpdateMembershipDto): Promise<{
        MembershipID: number;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        MembershipName: string;
        DiscountRate: Prisma.Decimal;
        MinPoints: number;
    }>;
    Delete(id: string): Promise<{
        MembershipID: number;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        MembershipName: string;
        DiscountRate: Prisma.Decimal;
        MinPoints: number;
    }>;
}
