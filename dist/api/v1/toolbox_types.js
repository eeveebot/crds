'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 'Toolbox';
}
export class Toolbox extends ApiObject {
    size;
    containerImage;
    pullPolicy;
    metrics;
    ipcConfig;
    /**
     * Returns the apiVersion and kind for "Toolbox"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'Toolbox',
    };
    /**
     * Renders a Kubernetes manifest for "Toolbox".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...Toolbox.GVK,
            ...toJson_ToolboxProps(props),
        };
    }
    /**
     * Defines a "Toolbox" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...Toolbox.GVK,
            ...props,
        });
        this.size = props?.spec?.size || 1;
        this.containerImage = props?.spec?.containerImage || 'ghcr.io/eeveebot/cli:latest';
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
            ...Toolbox.GVK,
            ...toJson_ToolboxProps(resolved),
        };
    }
}
export function toJson_ToolboxProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'metadata': obj.metadata,
        'spec': toJson_ToolboxSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_ToolboxSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'size': obj.size,
        'containerImage': obj.containerImage,
        'pullPolicy': obj.pullPolicy,
        'metrics': obj.metrics,
        'ipcConfig': obj.ipcConfig,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_ToolboxStatus(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'conditions': obj.conditions,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'Toolbox',
    plural: 'Toolboxes',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'toolbox',
};
