import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { StatusReasons } from './enums/index.mjs';
export interface backuprestoreResource extends KubernetesObject {
    spec: backuprestoreSpec;
    status: backuprestoreStatus;
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
export declare class backuprestore extends ApiObject implements backuprestoreSpec {
    botModule: BotModuleReference;
    s3Store: S3StoreReference;
    image: string;
    backupId?: string;
    /**
     * Returns the apiVersion and kind for "backuprestore"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "backuprestore".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: backuprestoreProps): unknown;
    /**
     * Defines a "backuprestore" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: backuprestoreProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface backuprestoreProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: backuprestoreSpec;
}
export declare function toJson_backuprestoreProps(obj: backuprestoreProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_backuprestoreSpec(obj: backuprestoreSpec | undefined): Record<string, unknown> | undefined;
export interface BotModuleReference {
    /**
     * Name of the botmodule resource in the same namespace
     */
    name: string;
}
export declare function toJson_BotModuleReference(obj: BotModuleReference | undefined): Record<string, unknown> | undefined;
export interface S3StoreReference {
    /**
     * Name of the s3store resource in the same namespace
     */
    name: string;
}
export declare function toJson_S3StoreReference(obj: S3StoreReference | undefined): Record<string, unknown> | undefined;
export interface backuprestoreSpec {
    /**
     * Reference to the botmodule whose PVC will be restored
     */
    botModule: BotModuleReference;
    /**
     * Reference to the s3store CR instance containing the backup
     */
    s3Store: S3StoreReference;
    /**
     * Container image to use for the restore job
     * (e.g. "ghcr.io/eevee/backup:latest")
     */
    image: string;
    /**
     * UUID of the specific backup to restore.
     * If omitted, the operator restores the latest backup for this module
     * (determined by listing objects and selecting the most recent by S3 LastModified).
     */
    backupId?: string;
}
export interface backuprestoreStatus {
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
     * Name of the managed K8s Job
     */
    jobName?: string;
    /**
     * UUID of the backup that was restored
     */
    restoredBackupId?: string;
    /**
     * Phase of the restore operation
     * (Pending, Running, Succeeded, Failed)
     */
    phase?: string;
}
export declare function toJson_backuprestoreStatus(obj: backuprestoreStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
