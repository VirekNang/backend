import { AuthService } from './auth.service';
import { LoginEmailDto } from './dto/create-login-email.dto';
import { LoginSecurityService } from './login-security.service';
import type { FastifyRequest } from 'fastify';
export declare class AuthController {
    private authService;
    private loginSecurity;
    constructor(authService: AuthService, loginSecurity: LoginSecurityService);
    login(body: LoginEmailDto, request: FastifyRequest): Promise<{
        status: string;
        token: string;
        user: {
            UserID: number;
            Username: string;
            Email: string;
            Image: string;
            IsAdmin: boolean;
            Permissions: {
                CreatedDate: Date;
                UpdatedDate: Date;
                UserID: number;
                UserPermissionID: number;
                PermissionName: string;
            }[];
        };
        tempDeviceId?: undefined;
        userId?: undefined;
    } | {
        status: string;
        token: string;
        tempDeviceId: any;
        user: {
            UserID: number;
            Username: string;
            Email: string;
            Image: string;
            IsAdmin: true;
            Permissions: {
                CreatedDate: Date;
                UpdatedDate: Date;
                UserID: number;
                UserPermissionID: number;
                PermissionName: string;
            }[];
        };
        userId?: undefined;
    } | {
        status: string;
        tempDeviceId: any;
        userId: number;
        token?: undefined;
        user?: undefined;
    }>;
    verifyPinAndPhone(body: {
        tempDeviceId: string;
        userId: number;
        pin: string;
        phone: string;
    }, request: FastifyRequest): Promise<{
        status: string;
    }>;
    checkApproval(body: {
        tempDeviceId: string;
    }): Promise<{
        status: string;
        userId?: undefined;
    } | {
        status: string;
        userId: number;
    } | {
        status: string;
        token: string;
        user: {
            UserID: number;
            Username: string;
            Email: string;
            Image: string;
            IsAdmin: boolean;
            Permissions: {
                CreatedDate: Date;
                UpdatedDate: Date;
                UserID: number;
                UserPermissionID: number;
                PermissionName: string;
            }[];
        };
    }>;
}
