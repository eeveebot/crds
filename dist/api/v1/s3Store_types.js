'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 's3stores';
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
export class s3store extends ApiObject {
    endpoint;
    accessId;
    accessKey;
    bucket;
    prefix;
    pathStyle;
    /**
     * Returns the apiVersion and kind for "s3store"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 's3stores',
    };
    /**
     * Renders a Kubernetes manifest for "s3store".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...s3store.GVK,
            ...toJson_s3storeProps(props),
        };
    }
    /**
     * Defines a "s3store" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...s3store.GVK,
            ...props,
        });
        this.endpoint = props?.spec?.endpoint || '';
        this.accessId = props?.spec?.accessId;
        this.accessKey = props?.spec?.accessKey;
        this.bucket = props?.spec?.bucket || '';
        this.prefix = props?.spec?.prefix;
        this.pathStyle = props?.spec?.pathStyle || false;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...s3store.GVK,
            ...toJson_s3storeProps(resolved),
        };
    }
}
export function toJson_s3storeProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_s3storeSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_s3storeSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        endpoint: obj.endpoint,
        accessId: toJson_S3SecretKeyRef(obj.accessId),
        accessKey: toJson_S3SecretKeyRef(obj.accessKey),
        bucket: obj.bucket,
        prefix: obj.prefix,
        pathStyle: obj.pathStyle,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_S3SecretKeyRef(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        secretKeyRef: obj.secretKeyRef,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_s3storeStatus(obj) {
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
    name: 's3store',
    plural: 's3stores',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 's3store',
};
