import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta, V1PersistentVolumeClaimSpec } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { StatusReasons } from './enums/index.mjs';
export interface botmoduleResource extends KubernetesObject {
    spec: botmoduleSpec;
    status: botmoduleStatus;
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
export declare class botmodule extends ApiObject implements botmoduleSpec {
    size: number;
    image: string;
    pullPolicy: string;
    metrics: boolean;
    metricsPort: number;
    ipcConfig: string;
    moduleName: string;
    persistentVolumeClaim?: V1PersistentVolumeClaimSpec;
    volumeMountPath: string;
    moduleConfig?: string;
    mountOperatorApiToken: boolean;
    enabled: boolean;
    /**
     * Returns the apiVersion and kind for "botmodule"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "botmodule".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: botmoduleProps): unknown;
    /**
     * Defines a "botmodule" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: botmoduleProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface botmoduleProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: botmoduleSpec;
}
export declare function toJson_botmoduleProps(obj: botmoduleProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_botmoduleSpec(obj: botmoduleSpec | undefined): Record<string, unknown> | undefined;
export interface botmoduleSpec {
    /**
     * Size defines the number of botmodule instances
     * Default: 1
     */
    size?: number;
    /**
     * Image defines the container image to use
     * Default: "ghcr.io/eeveebot/module:latest"
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
     * IPC configuration name
     */
    ipcConfig?: string;
    /**
     * ModuleName defines the name of the module
     */
    moduleName?: string;
    /**
     * PersistentVolumeClaim defines the PVC configuration for the module
     */
    persistentVolumeClaim?: V1PersistentVolumeClaimSpec;
    /**
     * VolumeMountPath defines where to mount the PVC in the container
     * Default: "/data"
     */
    volumeMountPath?: string;
    /**
     * ModuleConfig is a passthrough field for arbitrary YAML configuration
     * that will be passed directly to the module as a multi-line string
     */
    moduleConfig?: string;
    /**
     * MountOperatorApiToken defines whether to mount the operator API token
     * Default: false
     */
    mountOperatorApiToken?: boolean;
    /**
     * Enabled defines whether the botmodule is enabled or disabled
     * Default: true
     */
    enabled?: boolean;
}
export interface botmoduleStatus {
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
export declare function toJson_botmoduleStatus(obj: botmoduleStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
