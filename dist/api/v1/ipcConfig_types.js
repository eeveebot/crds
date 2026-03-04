'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 'ipcConfig';
}
export class IpcConfig extends ApiObject {
    nats;
    /**
     * Returns the apiVersion and kind for "ipcConfig"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'ipcConfig',
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
            ...IpcConfig.GVK,
            ...toJson_IpcConfigProps(props),
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
            ...IpcConfig.GVK,
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
            ...IpcConfig.GVK,
            ...toJson_IpcConfigProps(resolved),
        };
    }
}
export function toJson_IpcConfigProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'metadata': obj.metadata,
        'spec': toJson_IpcConfigSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_IpcConfigSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'nats': toJson_NatsConfig(obj.nats),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_NatsConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'managed': toJson_ManagedNatsConfig(obj.managed),
        'token': toJson_NatsTokenConfig(obj.token),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_ManagedNatsConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'enabled': obj.enabled,
        'spec': obj.spec,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_NatsTokenConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'generate': obj.generate,
        'secretKeyRef': obj.secretKeyRef,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'ipcConfig',
    plural: 'ipcConfigs',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'ipcConfig',
};
