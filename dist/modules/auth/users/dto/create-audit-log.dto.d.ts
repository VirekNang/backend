export declare class CreateAuditLogDto {
    UserID: number;
    TableName: string;
    RecordID?: number;
    ActionType: string;
    OldValue?: string;
    NewValue?: string;
    Note?: string;
}
