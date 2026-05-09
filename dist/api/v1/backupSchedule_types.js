'use strict';
import { ApiObject } from 'cdk8s';
import { toJson_S3StoreReference } from './enums/index.mjs';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 'backupschedules';
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
export class BackupSchedule extends ApiObject {
    schedule;
    s3Store;
    image;
    imagePullPolicy;
    /**
     * Returns the apiVersion and kind for "BackupSchedule"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'BackupSchedule',
    };
    /**
     * Renders a Kubernetes manifest for "BackupSchedule".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...BackupSchedule.GVK,
            ...toJson_BackupScheduleProps(props),
        };
    }
    /**
     * Defines a "BackupSchedule" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...BackupSchedule.GVK,
            ...props,
        });
        this.schedule = props?.spec?.schedule || '';
        this.s3Store = props?.spec?.s3Store;
        this.image = props?.spec?.image || 'ghcr.io/eeveebot/backupJob:latest';
        this.imagePullPolicy = props?.spec?.imagePullPolicy;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...BackupSchedule.GVK,
            ...toJson_BackupScheduleProps(resolved),
        };
    }
}
export function toJson_BackupScheduleProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_BackupScheduleSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_BackupScheduleSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        schedule: obj.schedule,
        s3Store: toJson_S3StoreReference(obj.s3Store),
        image: obj.image,
        imagePullPolicy: obj.imagePullPolicy,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_BackupScheduleStatus(obj) {
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
    name: 'BackupSchedule',
    plural: 'backupschedules',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'backupschedule',
};
