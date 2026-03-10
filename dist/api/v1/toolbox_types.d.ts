import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { StatusReasons } from './enums/index.mjs';
export interface ToolboxResource extends KubernetesObject {
    spec: ToolboxSpec;
    status: ToolboxStatus;
    metadata?: V1ObjectMeta | undefined;
}
export declare class ApiResource implements cdk8splus.IApiResource {
    apiGroup: string;
    resourceType: string;
}
export declare class Toolbox extends ApiObject implements ToolboxSpec {
    size: number;
    containerImage: string;
    pullPolicy: string;
    metrics: boolean;
    ipcConfig: string;
    /**
     * Returns the apiVersion and kind for "Toolbox"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "Toolbox".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: ToolboxProps): unknown;
    /**
     * Defines a "Toolbox" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: ToolboxProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface ToolboxProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: ToolboxSpec;
}
export declare function toJson_ToolboxProps(obj: ToolboxProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_ToolboxSpec(obj: ToolboxSpec | undefined): Record<string, unknown> | undefined;
export interface ToolboxSpec {
    /**
     * Size defines the number of Toolbox instances
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
export interface ToolboxStatus {
    /**
     * Conditions represent the latest available observations of a Toolbox's current state.
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
export declare function toJson_ToolboxStatus(obj: ToolboxStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
