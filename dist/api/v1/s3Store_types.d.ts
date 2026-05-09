import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
export interface S3StoreResource extends KubernetesObject {
    spec: S3StoreSpec;
    status: S3StoreStatus;
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
export declare class S3Store extends ApiObject implements S3StoreSpec {
    endpoint: string;
    accessId: S3SecretKeyRef;
    accessKey: S3SecretKeyRef;
    bucket: string;
    prefix?: string;
    region?: string;
    signatureV2?: boolean;
    pathStyle?: boolean;
    /**
     * Returns the apiVersion and kind for "S3Store"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "S3Store".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: S3StoreProps): unknown;
    /**
     * Defines a "S3Store" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: S3StoreProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface S3StoreProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: S3StoreSpec;
}
export declare function toJson_S3StoreProps(obj: S3StoreProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_S3StoreSpec(obj: S3StoreSpec | undefined): Record<string, unknown> | undefined;
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
export interface S3StoreSpec {
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
     * S3 region. For AWS, this should match the bucket region.
     * For S3-compatible stores (MinIO, Garage, etc.) the region
     * may not matter — `us-east-1` is used as a default.
     * Default: "us-east-1"
     */
    region?: string;
    /**
     * Use S3 v2 signature instead of v4. Set to true for Ceph RADOSGW
     * and older S3-compatible stores that require v2 signatures.
     * Modern stores (AWS S3, MinIO, Garage) support v4 — leave false.
     * Default: false
     */
    signatureV2?: boolean;
    /**
     * Use path-style addressing (host_base/bucket) instead of
     * virtual-hosted-style (bucket.host_base). Required for MinIO
     * and many S3-compatible stores.
     * Default: false
     */
    pathStyle?: boolean;
}
export type S3StoreStatusCondition = {
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
export interface S3StoreStatus {
    conditions: S3StoreStatusCondition[];
}
export declare function toJson_S3StoreStatus(obj: S3StoreStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
