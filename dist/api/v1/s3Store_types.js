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
export class S3Store extends ApiObject {
    endpoint;
    accessId;
    accessKey;
    bucket;
    prefix;
    region;
    signatureV2;
    pathStyle;
    /**
     * Returns the apiVersion and kind for "S3Store"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'S3Store',
    };
    /**
     * Renders a Kubernetes manifest for "S3Store".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...S3Store.GVK,
            ...toJson_S3StoreProps(props),
        };
    }
    /**
     * Defines a "S3Store" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...S3Store.GVK,
            ...props,
        });
        this.endpoint = props?.spec?.endpoint || '';
        this.accessId = props?.spec?.accessId;
        this.accessKey = props?.spec?.accessKey;
        this.bucket = props?.spec?.bucket || '';
        this.prefix = props?.spec?.prefix;
        this.region = props?.spec?.region;
        this.signatureV2 = props?.spec?.signatureV2;
        this.pathStyle = props?.spec?.pathStyle || false;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...S3Store.GVK,
            ...toJson_S3StoreProps(resolved),
        };
    }
}
export function toJson_S3StoreProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_S3StoreSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_S3StoreSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        endpoint: obj.endpoint,
        accessId: toJson_S3SecretKeyRef(obj.accessId),
        accessKey: toJson_S3SecretKeyRef(obj.accessKey),
        bucket: obj.bucket,
        prefix: obj.prefix,
        region: obj.region,
        signatureV2: obj.signatureV2,
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
export function toJson_S3StoreStatus(obj) {
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
    name: 'S3Store',
    plural: 's3stores',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 's3store',
};
