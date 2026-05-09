'use strict';
export var StatusReasons;
(function (StatusReasons) {
    StatusReasons["created"] = "created";
    StatusReasons["updated"] = "updated";
    StatusReasons["deleted"] = "deleted";
    StatusReasons["modified"] = "modified";
    StatusReasons["unknown"] = "unknown";
})(StatusReasons || (StatusReasons = {}));
export function toJson_S3StoreReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_BotModuleReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
