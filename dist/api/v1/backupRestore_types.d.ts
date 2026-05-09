import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { S3StoreReference, BotModuleReference } from './enums/index.mjs';
export interface BackupRestoreResource extends KubernetesObject {
    spec: BackupRestoreSpec;
    status: BackupRestoreStatus;
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
export declare class BackupRestore extends ApiObject implements BackupRestoreSpec {
    botModule: BotModuleReference;
    s3Store: S3StoreReference;
    image: string;
    imagePullPolicy?: string;
    backupId?: string;
    cleanRestore?: boolean;
    /**
     * Returns the apiVersion and kind for "BackupRestore"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "BackupRestore".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: BackupRestoreProps): unknown;
    /**
     * Defines a "BackupRestore" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: BackupRestoreProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface BackupRestoreProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: BackupRestoreSpec;
}
export declare function toJson_BackupRestoreProps(obj: BackupRestoreProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_BackupRestoreSpec(obj: BackupRestoreSpec | undefined): Record<string, unknown> | undefined;
export interface BackupRestoreSpec {
    /**
     * Reference to the BotModule whose PVC will be restored
     */
    botModule: BotModuleReference;
    /**
     * Reference to the S3Store CR instance containing the backup
     */
    s3Store: S3StoreReference;
    /**
     * Container image to use for the restore job
     * (e.g. "ghcr.io/eevee/backup:latest")
     */
    image: string;
    /**
     * Image pull policy for the restore job container.
     * One of "Always", "IfNotPresent", "Never".
     * Default: "IfNotPresent"
     */
    imagePullPolicy?: string;
    /**
     * UUID of the specific backup to restore.
     * If omitted, the operator restores the latest backup for this module
     * (determined by listing objects and selecting the most recent by S3 LastModified).
     */
    backupId?: string;
    /**
     * If true, the restore script will delete all existing data in the PVC
     * before extracting the backup archive. This ensures a clean restore
     * with no leftover files from a previous state.
     * Default: false
     */
    cleanRestore?: boolean;
}
export type BackupRestoreStatusCondition = {
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
export interface BackupRestoreStatus {
    conditions: BackupRestoreStatusCondition[];
}
export declare function toJson_BackupRestoreStatus(obj: BackupRestoreStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
