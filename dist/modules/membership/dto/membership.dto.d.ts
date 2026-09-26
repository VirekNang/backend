export declare class CreateMembershipDto {
    MembershipName: string;
    DiscountRate?: number;
    MinPoints?: number;
    Description?: string;
}
declare const UpdateMembershipDto_base: import("@nestjs/common").Type<Partial<CreateMembershipDto>>;
export declare class UpdateMembershipDto extends UpdateMembershipDto_base {
}
export {};
