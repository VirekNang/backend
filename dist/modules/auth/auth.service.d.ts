import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export type TokenPayload = {
    UserID: number;
    Email: string;
    UserType: 'admin' | 'app';
    SessionID: string;
};
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    finduserByemail(emailOrUsername: string): import("@prisma/client").Prisma.Prisma__UsersClient<{
        Phone: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Image: string;
        IsActive: boolean;
        IsDelete: boolean;
        UserID: number;
        Username: string;
        Password: string;
        Email: string;
        PinCode: string | null;
        IsAdmin: boolean;
        IsDuDate: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAdminUserByEmail(emailOrUsername: string): import("@prisma/client").Prisma.Prisma__UsersClient<({
        Permissions: {
            CreatedDate: Date;
            UpdatedDate: Date;
            UserID: number;
            UserPermissionID: number;
            PermissionName: string;
        }[];
    } & {
        Phone: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Image: string;
        IsActive: boolean;
        IsDelete: boolean;
        UserID: number;
        Username: string;
        Password: string;
        Email: string;
        PinCode: string | null;
        IsAdmin: boolean;
        IsDuDate: Date;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    finduserByid(id: number): import("@prisma/client").Prisma.Prisma__UsersClient<{
        Phone: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Image: string;
        IsActive: boolean;
        IsDelete: boolean;
        UserID: number;
        Username: string;
        Password: string;
        Email: string;
        PinCode: string | null;
        IsAdmin: boolean;
        IsDuDate: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    getAdminUser(id: number): import("@prisma/client").Prisma.Prisma__UsersClient<({
        Permissions: {
            CreatedDate: Date;
            UpdatedDate: Date;
            UserID: number;
            UserPermissionID: number;
            PermissionName: string;
        }[];
    } & {
        Phone: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Image: string;
        IsActive: boolean;
        IsDelete: boolean;
        UserID: number;
        Username: string;
        Password: string;
        Email: string;
        PinCode: string | null;
        IsAdmin: boolean;
        IsDuDate: Date;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    CreateUser(data: {
        Username: string;
        Email: string;
        Password?: string;
        Image?: string;
    }): import("@prisma/client").Prisma.Prisma__UsersClient<{
        Phone: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Image: string;
        IsActive: boolean;
        IsDelete: boolean;
        UserID: number;
        Username: string;
        Password: string;
        Email: string;
        PinCode: string | null;
        IsAdmin: boolean;
        IsDuDate: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAccount(provider: string, providerAccountID: string): any;
    updateAccount(accId: number, data: {
        RefreshToken?: string;
        AccessToken?: string;
        ExpiresAt?: number;
        TokenType?: string;
        Scope?: string;
        IDToken?: string;
        SessionState?: string;
    }): any;
    createAccount(data: {
        UserID: number;
        AccountType: string;
        Provider: string;
        ProviderAccountID: string;
        RefreshToken?: string;
        AccessToken?: string;
        ExpiresAt?: number;
        TokenType?: string;
        Scope?: string;
        IDToken?: string;
        SessionState?: string;
    }): any;
    CreateCustomer(data: {
        UserID: number;
        CustomerNo?: string;
        CustomerName: string;
        Gender: string;
        Location: string;
        Address: string;
        Phone: string;
        MemberShip: string;
        MemberStatus: string;
        Note: string;
    }): Promise<{
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
    findCustomerByPhone(phone: string): import("@prisma/client").Prisma.Prisma__CustomerClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    ensureGuestCustomer(data: {
        CustomerName: string;
        Phone: string;
    }): Promise<{
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
    signToken(payload: {
        UserID: number;
        Email: string;
        UserType?: 'admin' | 'app';
    }): Promise<string>;
    verifyToken(token: string): Promise<TokenPayload>;
    validateSession(payload: TokenPayload): Promise<{
        UserType: string;
        Phone: string;
        uuid: string;
        CreatedDate: Date;
        UpdatedDate: Date;
        Image: string;
        IsActive: boolean;
        IsDelete: boolean;
        UserID: number;
        Username: string;
        Password: string;
        Email: string;
        PinCode: string | null;
        IsAdmin: boolean;
        IsDuDate: Date;
    } | null>;
    upsertPhoneVerification(phone: string, otp: string, expiresAt: Date): any;
    findPhoneVerification(phone: string): any;
    markPhoneVerified(phone: string): any;
    deletePhoneVerification(phone: string): any;
    findDevice(deviceIdentifier: string): import("@prisma/client").Prisma.Prisma__DeviceClient<{
        UserID: number;
        CreatedAt: Date;
        DeviceID: number;
        DeviceIdentifier: string;
        UserAgent: string | null;
        IsBlocked: boolean;
        IsVerified: boolean;
        LastLoginAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateDeviceLogin(deviceId: number): import("@prisma/client").Prisma.Prisma__DeviceClient<{
        UserID: number;
        CreatedAt: Date;
        DeviceID: number;
        DeviceIdentifier: string;
        UserAgent: string | null;
        IsBlocked: boolean;
        IsVerified: boolean;
        LastLoginAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    hasVerifiedDevice(userId: number): Promise<boolean>;
    markDeviceVerified(deviceId: number): import("@prisma/client").Prisma.Prisma__DeviceClient<{
        UserID: number;
        CreatedAt: Date;
        DeviceID: number;
        DeviceIdentifier: string;
        UserAgent: string | null;
        IsBlocked: boolean;
        IsVerified: boolean;
        LastLoginAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createDevice(userId: number, deviceIdentifier: string, userAgent: string): import("@prisma/client").Prisma.Prisma__DeviceClient<{
        UserID: number;
        CreatedAt: Date;
        DeviceID: number;
        DeviceIdentifier: string;
        UserAgent: string | null;
        IsBlocked: boolean;
        IsVerified: boolean;
        LastLoginAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createVerificationRequest(deviceId: number, userId: number, ipAddress: string, location: string): Promise<{
        UserID: number;
        CreatedAt: Date;
        DeviceID: number;
        Status: string;
        IPAddress: string | null;
        Location: string | null;
        RejectionCount: number;
        UpdatedAt: Date;
        RequestID: number;
    }>;
    approveVerificationRequest(requestId: number): import("@prisma/client").Prisma.Prisma__DeviceVerificationRequestClient<{
        UserID: number;
        CreatedAt: Date;
        DeviceID: number;
        Status: string;
        IPAddress: string | null;
        Location: string | null;
        RejectionCount: number;
        UpdatedAt: Date;
        RequestID: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    checkDeviceApproval(deviceIdentifier: string): Promise<{
        status: string;
        userId?: undefined;
    } | {
        status: string;
        userId: number;
    }>;
}
