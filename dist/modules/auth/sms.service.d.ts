export declare class SmsService {
    private readonly logger;
    sendVerificationCode(phone: string, otp: string): Promise<void>;
}
