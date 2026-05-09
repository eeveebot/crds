'use strict';
import { ApiObject } from 'cdk8s';
import { toJson_S3StoreReference, toJson_BotModuleReference } from './enums/index.mjs';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 'backuprestores';
    /**
     * Return the IApiResource this object represents.
     */
    asApiResource() {
        return this;
    }
    /**
     * Return the non resource url this object represents.
     */
    asNonApiResource() {
        return undefined;
    }
}
export class BackupRestore extends ApiObject {
    botModule;
    s3Store;
    image;
    imagePullPolicy;
    backupId;
    cleanRestore;
    /**
     * Returns the apiVersion and kind for "BackupRestore"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'BackupRestore',
    };
    /**
     * Renders a Kubernetes manifest for "BackupRestore".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...BackupRestore.GVK,
            ...toJson_BackupRestoreProps(props),
        };
    }
    /**
     * Defines a "BackupRestore" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...BackupRestore.GVK,
            ...props,
        });
        this.botModule = props?.spec?.botModule;
        this.s3Store = props?.spec?.s3Store;
        this.image = props?.spec?.image || 'ghcr.io/eeveebot/backupJob:latest';
        this.imagePullPolicy = props?.spec?.imagePullPolicy;
        this.backupId = props?.spec?.backupId;
        this.cleanRestore = props?.spec?.cleanRestore;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...BackupRestore.GVK,
            ...toJson_BackupRestoreProps(resolved),
        };
    }
}
export function toJson_BackupRestoreProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_BackupRestoreSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_BackupRestoreSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        botModule: toJson_BotModuleReference(obj.botModule),
        s3Store: toJson_S3StoreReference(obj.s3Store),
        image: obj.image,
        imagePullPolicy: obj.imagePullPolicy,
        backupId: obj.backupId,
        cleanRestore: obj.cleanRestore,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_BackupRestoreStatus(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        conditions: obj.conditions,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'BackupRestore',
    plural: 'backuprestores',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'backuprestore',
};
