import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { StatusReasons } from './enums/index.mjs';
export interface routerResource extends KubernetesObject {
    spec: routerSpec;
    status: routerStatus;
    metadata?: V1ObjectMeta | undefined;
}
export declare class ApiResource implements cdk8splus.IApiResource {
    apiGroup: string;
    resourceType: string;
    /**
     * Return the IApiResource this object represents.
     */
    asApiResource(): cdk8splus.IApiResource | undefined;
    /**
     * Return the non resource url this object represents.
     */
    asNonApiResource(): string | undefined;
}
export declare class router extends ApiObject implements routerSpec {
    size: number;
    image: string;
    pullPolicy: string;
    metrics: boolean;
    metricsPort: number;
    moduleConfig?: Record<string, unknown>;
    /**
     * Returns the apiVersion and kind for "router"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "router".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: routerProps): unknown;
    /**
     * Defines a "router" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: routerProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface routerProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: routerSpec;
}
export declare function toJson_routerProps(obj: routerProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_routerSpec(obj: routerSpec | undefined): Record<string, unknown> | undefined;
export interface routerSpec {
    /**
     * Size defines the number of router instances
     * Default: 1
     */
    size?: number;
    /**
     * Image defines the container image to use
     * Default: "ghcr.io/eeveebot/router:latest"
     */
    image?: string;
    /**
     * PullPolicy defines the image pull policy to use
     * Default: "Always"
     */
    pullPolicy?: string;
    /**
     * Metrics defines whether to enable metrics or not
     * Default: false
     */
    metrics?: boolean;
    /**
     * MetricsPort defines the port to expose metrics on
     * Default: 8080
     */
    metricsPort?: number;
    /**
     * ModuleConfig is a passthrough field for arbitrary YAML configuration
     * that will be passed directly to the router
     */
    moduleConfig?: Record<string, unknown>;
}
export interface routerStatus {
    /**
     * lastTransitionTime is the last time the condition transitioned from one status to another. This is not guaranteed to be set in happensBefore order across different conditions for a given object. It may be unset in some circumstances.
     */
    lastTransitionTime: Date;
    /**
     * message is a human readable message indicating details about the transition. This may be an empty string.
     */
    message: string;
    /**
     * reason contains a programmatic identifier indicating the reason for the condition's last transition.
     */
    reason: StatusReasons;
    /**
     * observedGeneration
     */
    observedGeneration?: number;
}
export declare function toJson_routerStatus(obj: routerStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
