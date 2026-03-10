import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { StatusReasons } from './enums/index.mjs';
export interface toolboxResource extends KubernetesObject {
    spec: toolboxSpec;
    status: toolboxStatus;
    metadata?: V1ObjectMeta | undefined;
}
export declare class ApiResource implements cdk8splus.IApiResource {
    apiGroup: string;
    resourceType: string;
}
export declare class toolbox extends ApiObject implements toolboxSpec {
    size: number;
    containerImage: string;
    pullPolicy: string;
    metrics: boolean;
    ipcConfig: string;
    /**
     * Returns the apiVersion and kind for "toolbox"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "toolbox".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: toolboxProps): unknown;
    /**
     * Defines a "toolbox" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: toolboxProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface toolboxProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: toolboxSpec;
}
export declare function toJson_toolboxProps(obj: toolboxProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_toolboxSpec(obj: toolboxSpec | undefined): Record<string, unknown> | undefined;
export interface toolboxSpec {
    /**
     * Size defines the number of toolbox instances
     */
    size?: number;
    /**
     * ContainerImage defines the container image to use
     * Default: "ghcr.io/eeveebot/cli:latest"
     */
    containerImage?: string;
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
     * IPC configuration name
     */
    ipcConfig?: string;
}
export interface toolboxStatus {
    /**
     * Conditions represent the latest available observations of a toolbox's current state.
     * Known condition types are: "Available", "Progressing", and "Degraded"
     */
    conditions?: {
        /**
         * Type of condition
         */
        type: string;
        /**
         * Status of the condition, one of True, False, Unknown
         */
        status: string;
        /**
         * Last time the condition transitioned from one status to another
         */
        lastTransitionTime: Date;
        /**
         * Unique, one-word, CamelCase reason for the condition's last transition
         */
        reason: StatusReasons;
        /**
         * Human-readable message indicating details about last transition
         */
        message: string;
        /**
         * ObservedGeneration represents the .metadata.generation that the condition was set based upon
         */
        observedGeneration?: number;
    }[];
}
export declare function toJson_toolboxStatus(obj: toolboxStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
