'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 'ipcconfigs';
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
export class ipcconfig extends ApiObject {
    nats;
    /**
     * Returns the apiVersion and kind for "ipcConfig"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'ipcconfig',
    };
    /**
     * Renders a Kubernetes manifest for "ipcConfig".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...ipcconfig.GVK,
            ...toJson_ipcconfigProps(props),
        };
    }
    /**
     * Defines a "ipcConfig" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...ipcconfig.GVK,
            ...props,
        });
        this.nats = props?.spec?.nats;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...ipcconfig.GVK,
            ...toJson_ipcconfigProps(resolved),
        };
    }
}
export function toJson_ipcconfigProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_ipcconfigSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_ipcconfigSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        nats: toJson_NatsConfig(obj.nats),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_NatsConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        managed: toJson_ManagedNatsConfig(obj.managed),
        token: toJson_NatsTokenConfig(obj.token),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_ManagedNatsConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        enabled: obj.enabled,
        image: obj.image,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_NatsTokenConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        generate: obj.generate,
        secretKeyRef: obj.secretKeyRef,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'ipcconfig',
    plural: 'ipcconfigs',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'ipcconfig',
};
