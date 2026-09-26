import { PrismaService } from '../../prisma/prisma.service';
import type { FastifyRequest } from 'fastify';
type LoginResult = {
    userId?: number;
    userType: 'admin' | 'app';
    email: string;
    success: boolean;
    failureReason?: string;
};
export declare class LoginSecurityService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    recordLogin(result: LoginResult, request: FastifyRequest): Promise<void>;
    summary(): Promise<{
        total: number;
        successful: number;
        failed: number;
        recent: {
            UserID: number | null;
            Email: string;
            UserType: string;
            CreatedAt: Date;
            UserAgent: string | null;
            IPAddress: string | null;
            Location: string | null;
            Success: boolean;
            FailureReason: string | null;
            LoginActivityID: number;
        }[];
    }>;
    private getIpAddress;
    private getLocation;
    private getBrowserLocation;
    private sendTelegramAlert;
    sendNewDeviceAlert(user: any, ipAddress: string, location: string, userAgent: string): Promise<void>;
}
export {};
