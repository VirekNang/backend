import { PrismaService } from '../../../prisma/prisma.service';
import type { FastifyRequest } from 'fastify';
import { CreatePermissionDto, CreateAuditLogDto } from './dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly systemPermissions;
    private syncAdministratorPermissions;
    private saveFile;
    createUser(request: FastifyRequest): Promise<{
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
    }>;
    findAll(): Promise<({
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
    })[]>;
    findOne(id: string): Promise<{
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
    }>;
    updateUser(id: string, request: FastifyRequest): Promise<{
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
    }>;
    deleteUser(id: string): Promise<{
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
    }>;
    addPermission(dto: CreatePermissionDto): Promise<{
        CreatedDate: Date;
        UpdatedDate: Date;
        UserID: number;
        UserPermissionID: number;
        PermissionName: string;
    }>;
    listPermissions(userId: number): Promise<{
        CreatedDate: Date;
        UpdatedDate: Date;
        UserID: number;
        UserPermissionID: number;
        PermissionName: string;
    }[]>;
    removePermission(id: number): Promise<{
        CreatedDate: Date;
        UpdatedDate: Date;
        UserID: number;
        UserPermissionID: number;
        PermissionName: string;
    }>;
    createLog(dto: CreateAuditLogDto): Promise<null>;
    listLogs(filter?: {
        userId?: number;
        tableName?: string;
    }): Promise<never[]>;
    initFirstAdmin(): Promise<{
        message: string;
        email: string;
        password: string;
        error?: undefined;
    } | {
        message: string;
        error: any;
        email?: undefined;
        password?: undefined;
    }>;
}
