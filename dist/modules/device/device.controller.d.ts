import { DeviceService } from './device.service';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    private ensureAdministrator;
    getPendingRequests(request: any): Promise<({
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
    approveRequest(body: {
        requestId: number;
    }, request: any): Promise<{
        success: boolean;
    }>;
    rejectRequest(body: {
        requestId: number;
    }, request: any): Promise<{
        success: boolean;
    }>;
    getBlockedDevices(request: any): Promise<({
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
    unblockDevice(body: {
        deviceId: number;
    }, request: any): Promise<{
        success: boolean;
    }>;
}
