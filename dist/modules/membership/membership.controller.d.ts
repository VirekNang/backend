import { MembershipService } from './membership.service';
import { CreateMembershipDto, UpdateMembershipDto } from './dto/membership.dto';
export declare class MembershipController {
    private readonly membershipService;
    constructor(membershipService: MembershipService);
    GetAll(): import("@prisma/client").Prisma.PrismaPromise<{
        MembershipID: number;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        MembershipName: string;
        DiscountRate: import("@prisma/client-runtime-utils").Decimal;
        MinPoints: number;
    }[]>;
    GetById(id: string): import("@prisma/client").Prisma.Prisma__MembershipClient<{
        MembershipID: number;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        MembershipName: string;
        DiscountRate: import("@prisma/client-runtime-utils").Decimal;
        MinPoints: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Create(membership: CreateMembershipDto): import("@prisma/client").Prisma.Prisma__MembershipClient<{
        MembershipID: number;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        MembershipName: string;
        DiscountRate: import("@prisma/client-runtime-utils").Decimal;
        MinPoints: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    Update(id: string, membership: UpdateMembershipDto): Promise<{
        MembershipID: number;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        MembershipName: string;
        DiscountRate: import("@prisma/client-runtime-utils").Decimal;
        MinPoints: number;
    }>;
    Delete(id: string): Promise<{
        MembershipID: number;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Description: string | null;
        MembershipName: string;
        DiscountRate: import("@prisma/client-runtime-utils").Decimal;
        MinPoints: number;
    }>;
}
