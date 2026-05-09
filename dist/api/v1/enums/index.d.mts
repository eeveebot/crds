export declare enum StatusReasons {
    created = "created",
    updated = "updated",
    deleted = "deleted",
    modified = "modified",
    unknown = "unknown"
}
export interface S3StoreReference {
    /**
     * Name of the S3Store resource in the same namespace
     */
    name: string;
}
export declare function toJson_S3StoreReference(obj: S3StoreReference | undefined): Record<string, unknown> | undefined;
export interface BotModuleReference {
    /**
     * Name of the BotModule resource in the same namespace
     */
    name: string;
}
export declare function toJson_BotModuleReference(obj: BotModuleReference | undefined): Record<string, unknown> | undefined;
