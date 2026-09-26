import { PrismaService } from '../../prisma/prisma.service';
export declare class DeviceService {
    private prisma;
    constructor(prisma: PrismaService);
    getPendingRequests(): Promise<({
        User: {
            Phone: string;
            Image: string;
            Username: string;
            Email: string;
        };
        Device: {
            UserID: number;
            CreatedAt: Date;
            DeviceID: number;
            DeviceIdentifier: string;
            UserAgent: string | null;
            IsBlocked: boolean;
            IsVerified: boolean;
            LastLoginAt: Date;
        };
    } & {
        UserID: number;
        CreatedAt: Date;
        DeviceID: number;
        Status: string;
        IPAddress: string | null;
        Location: string | null;
        RejectionCount: number;
        UpdatedAt: Date;
        RequestID: number;
    })[]>;
    approveRequest(requestId: number): Promise<{
        success: boolean;
    }>;
    rejectRequest(requestId: number): Promise<{
        success: boolean;
    }>;
    getBlockedDevices(): Promise<({
        User: {
            Username: string;
            Email: string;
        };
    } & {
        UserID: number;
        CreatedAt: Date;
        DeviceID: number;
        DeviceIdentifier: string;
        UserAgent: string | null;
        IsBlocked: boolean;
        IsVerified: boolean;
        LastLoginAt: Date;
    })[]>;
    unblockDevice(deviceId: number): Promise<{
        success: boolean;
    }>;
}
