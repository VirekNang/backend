import { AuthService, TokenPayload } from './auth.service';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: TokenPayload): Promise<{
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
    }>;
}
export {};
