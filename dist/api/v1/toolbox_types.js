'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 'toolbox';
}
export class toolbox extends ApiObject {
    size;
    image;
    pullPolicy;
    metrics;
    ipcConfig;
    /**
     * Returns the apiVersion and kind for "toolbox"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'toolbox',
    };
    /**
     * Renders a Kubernetes manifest for "toolbox".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...toolbox.GVK,
            ...toJson_toolboxProps(props),
        };
    }
    /**
     * Defines a "toolbox" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...toolbox.GVK,
            ...props,
        });
        this.size = props?.spec?.size || 1;
        this.image = props?.spec?.image || 'ghcr.io/eeveebot/cli:latest';
        this.pullPolicy = props?.spec?.pullPolicy || 'Always';
        this.metrics = props?.spec?.metrics || false;
        this.ipcConfig = props?.spec?.ipcConfig || '';
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...toolbox.GVK,
            ...toJson_toolboxProps(resolved),
        };
    }
}
export function toJson_toolboxProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_toolboxSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_toolboxSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        size: obj.size,
        image: obj.image,
        pullPolicy: obj.pullPolicy,
        metrics: obj.metrics,
        ipcConfig: obj.ipcConfig,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_toolboxStatus(obj) {
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
    name: 'toolbox',
    plural: 'toolboxes',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'toolbox',
};
