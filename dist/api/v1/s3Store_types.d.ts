import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { StatusReasons } from './enums/index.mjs';
export interface s3storeResource extends KubernetesObject {
    spec: s3storeSpec;
    status: s3storeStatus;
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
export declare class s3store extends ApiObject implements s3storeSpec {
    endpoint: string;
    accessId: S3SecretKeyRef;
    accessKey: S3SecretKeyRef;
    bucket: string;
    prefix?: string;
    pathStyle?: boolean;
    /**
     * Returns the apiVersion and kind for "s3store"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "s3store".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: s3storeProps): unknown;
    /**
     * Defines a "s3store" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: s3storeProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface s3storeProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: s3storeSpec;
}
export declare function toJson_s3storeProps(obj: s3storeProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_s3storeSpec(obj: s3storeSpec | undefined): Record<string, unknown> | undefined;
export interface S3SecretKeyRef {
    /**
     * Reference to a K8s Secret containing the credential value
     */
    secretKeyRef: {
        secret: cdk8splus.k8s.SecretReference;
        key: string;
    };
}
export declare function toJson_S3SecretKeyRef(obj: S3SecretKeyRef | undefined): Record<string, unknown> | undefined;
export interface s3storeSpec {
    /**
     * S3-compatible endpoint URL
     * (e.g. "https://s3.amazonaws.com" or "https://minio.example.com")
     */
    endpoint: string;
    /**
     * Reference to a Secret containing the S3 access key ID
     */
    accessId: S3SecretKeyRef;
    /**
     * Reference to a Secret containing the S3 secret access key
     */
    accessKey: S3SecretKeyRef;
    /**
     * S3 bucket name
     */
    bucket: string;
    /**
     * Common file prefix within the bucket for all objects
     * managed by this store (e.g. "eevee/backups/")
     */
    prefix?: string;
    /**
     * Use path-style addressing (host_base/bucket) instead of
     * virtual-hosted-style (bucket.host_base). Required for MinIO
     * and many S3-compatible stores.
     * Default: false
     */
    pathStyle?: boolean;
}
export interface s3storeStatus {
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
    /**
     * Timestamp of the last successful connection test to the S3 endpoint
     */
    lastConnectionTest?: string;
}
export declare function toJson_s3storeStatus(obj: s3storeStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
