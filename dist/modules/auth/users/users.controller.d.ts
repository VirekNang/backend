import { UsersService } from './users.service';
import { CreatePermissionDto, CreateAuditLogDto } from './dto';
import type { FastifyRequest } from 'fastify';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(request: FastifyRequest): Promise<{
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
    update(id: string, request: FastifyRequest): Promise<{
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
    remove(id: string): Promise<{
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
    createLog(dto: CreateAuditLogDto): Promise<null>;
    listLogs(userId?: number, tableName?: string): Promise<never[]>;
    initAdmin(): Promise<{
        message: string;
        count: number;
    }>;
    debugUsers(): Promise<{
        message: string;
    }>;
}
