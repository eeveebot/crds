'use strict';
import { ApiObject } from 'cdk8s';
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
export class backuprestore extends ApiObject {
    botModule;
    s3Store;
    image;
    backupId;
    /**
     * Returns the apiVersion and kind for "backuprestore"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'backuprestores',
    };
    /**
     * Renders a Kubernetes manifest for "backuprestore".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...backuprestore.GVK,
            ...toJson_backuprestoreProps(props),
        };
    }
    /**
     * Defines a "backuprestore" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...backuprestore.GVK,
            ...props,
        });
        this.botModule = props?.spec?.botModule;
        this.s3Store = props?.spec?.s3Store;
        this.image = props?.spec?.image || '';
        this.backupId = props?.spec?.backupId;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...backuprestore.GVK,
            ...toJson_backuprestoreProps(resolved),
        };
    }
}
export function toJson_backuprestoreProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_backuprestoreSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_backuprestoreSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        botModule: toJson_BotModuleReference(obj.botModule),
        s3Store: toJson_S3StoreReference(obj.s3Store),
        image: obj.image,
        backupId: obj.backupId,
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
export function toJson_backuprestoreStatus(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        lastTransitionTime: obj.lastTransitionTime,
        message: obj.message,
        reason: obj.reason,
        observedGeneration: obj.observedGeneration,
        jobName: obj.jobName,
        restoredBackupId: obj.restoredBackupId,
        phase: obj.phase,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'backuprestore',
    plural: 'backuprestores',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'backuprestore',
};
