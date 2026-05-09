import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
export interface IpcConfigResource extends KubernetesObject {
    spec: IpcConfigSpec;
    status: IpcConfigStatus;
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
export declare class IpcConfig extends ApiObject implements IpcConfigSpec {
    nats?: NatsConfig;
    /**
     * Returns the apiVersion and kind for "ipcConfig"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "IpcConfig".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: IpcConfigProps): unknown;
    /**
     * Defines a "IpcConfig" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: IpcConfigProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface IpcConfigProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: IpcConfigSpec;
}
export declare function toJson_IpcConfigProps(obj: IpcConfigProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_IpcConfigSpec(obj: IpcConfigSpec | undefined): Record<string, unknown> | undefined;
export interface IpcConfigSpec {
    /**
     * NATS configuration
     */
    nats?: NatsConfig;
}
export interface NatsConfig {
    /**
     * Managed NATS deployment configuration
     */
    managed?: ManagedNatsConfig;
    /**
     * NATS token authentication configuration
     */
    token?: NatsTokenConfig;
}
export interface ManagedNatsConfig {
    /**
     * Should the eevee-operator deploy a NATS server for us?
     */
    enabled: boolean;
    /**
     * NATS container image to use
     */
    image?: string;
}
export interface NatsTokenConfig {
    /**
     * Should the eevee-operator generate a token for NATS auth?
     */
    generate: boolean;
    /**
     * Where to access the NATS auth token
     */
    secretKeyRef?: {
        secret: cdk8splus.k8s.SecretReference;
        key: string;
    };
}
export declare function toJson_NatsConfig(obj: NatsConfig | undefined): Record<string, unknown> | undefined;
export declare function toJson_ManagedNatsConfig(obj: ManagedNatsConfig | undefined): Record<string, unknown> | undefined;
export declare function toJson_NatsTokenConfig(obj: NatsTokenConfig | undefined): Record<string, unknown> | undefined;
export type IpcConfigStatusCondition = {
    /**
     * type of condition in CamelCase or in foo.example.com/CamelCase.
     */
    type: string;
    /**
     * status of the condition, one of True, False, Unknown.
     */
    status: string;
    /**
     * reason contains a programmatic identifier indicating the reason for the condition's last transition.
     */
    reason: string;
    /**
     * message is a human readable message indicating details about the transition.
     */
    message: string;
    /**
     * lastTransitionTime is the last time the condition transitioned from one status to another.
     */
    lastTransitionTime: string;
    /**
     * observedGeneration represents the .metadata.generation that the condition was set based upon.
     */
    observedGeneration?: number;
};
export interface IpcConfigStatus {
    conditions: IpcConfigStatusCondition[];
}
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
