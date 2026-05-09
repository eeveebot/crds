'use strict';
import { ApiObject } from 'cdk8s';
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
export class backupschedule extends ApiObject {
    schedule;
    s3Store;
    image;
    /**
     * Returns the apiVersion and kind for "backupschedule"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'backupschedules',
    };
    /**
     * Renders a Kubernetes manifest for "backupschedule".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...backupschedule.GVK,
            ...toJson_backupscheduleProps(props),
        };
    }
    /**
     * Defines a "backupschedule" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...backupschedule.GVK,
            ...props,
        });
        this.schedule = props?.spec?.schedule || '';
        this.s3Store = props?.spec?.s3Store;
        this.image = props?.spec?.image || '';
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...backupschedule.GVK,
            ...toJson_backupscheduleProps(resolved),
        };
    }
}
export function toJson_backupscheduleProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_backupscheduleSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_backupscheduleSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        schedule: obj.schedule,
        s3Store: toJson_S3StoreReference(obj.s3Store),
        image: obj.image,
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
export function toJson_backupscheduleStatus(obj) {
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
    name: 'backupschedule',
    plural: 'backupschedules',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'backupschedule',
};
