'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 'routers';
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
export class router extends ApiObject {
    size;
    image;
    pullPolicy;
    metrics;
    metricsPort;
    moduleConfig;
    /**
     * Returns the apiVersion and kind for "router"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'routers',
    };
    /**
     * Renders a Kubernetes manifest for "router".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...router.GVK,
            ...toJson_routerProps(props),
        };
    }
    /**
     * Defines a "router" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...router.GVK,
            ...props,
        });
        this.size = props?.spec?.size || 1;
        this.image = props?.spec?.image || 'ghcr.io/eeveebot/router:latest';
        this.pullPolicy = props?.spec?.pullPolicy || 'Always';
        this.metrics = props?.spec?.metrics || false;
        this.metricsPort = props?.spec?.metricsPort || 8080;
        this.moduleConfig = props?.spec?.moduleConfig;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...router.GVK,
            ...toJson_routerProps(resolved),
        };
    }
}
export function toJson_routerProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_routerSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_routerSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        size: obj.size,
        image: obj.image,
        pullPolicy: obj.pullPolicy,
        metrics: obj.metrics,
        metricsPort: obj.metricsPort,
        moduleConfig: obj.moduleConfig,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_routerStatus(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        lastTransitionTime: obj.lastTransitionTime,
        message: obj.message,
        reason: obj.reason,
        observedGeneration: obj.observedGeneration,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'router',
    plural: 'routers',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'router',
};
