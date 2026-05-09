import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { StatusReasons } from './enums/index.mjs';
export interface backupscheduleResource extends KubernetesObject {
    spec: backupscheduleSpec;
    status: backupscheduleStatus;
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
export declare class backupschedule extends ApiObject implements backupscheduleSpec {
    schedule: string;
    s3Store: S3StoreReference;
    image: string;
    /**
     * Returns the apiVersion and kind for "backupschedule"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "backupschedule".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: backupscheduleProps): unknown;
    /**
     * Defines a "backupschedule" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: backupscheduleProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface backupscheduleProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: backupscheduleSpec;
}
export declare function toJson_backupscheduleProps(obj: backupscheduleProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_backupscheduleSpec(obj: backupscheduleSpec | undefined): Record<string, unknown> | undefined;
export interface S3StoreReference {
    /**
     * Name of the s3store resource in the same namespace
     */
    name: string;
}
export declare function toJson_S3StoreReference(obj: S3StoreReference | undefined): Record<string, unknown> | undefined;
export interface backupscheduleSpec {
    /**
     * Crontab-style schedule expression (e.g. "0 2 * * *" for daily at 2am).
     * Translated directly to the CronJob schedule.
     */
    schedule: string;
    /**
     * Reference to the s3store CR instance
     */
    s3Store: S3StoreReference;
    /**
     * Container image to use for the backup job
     * (e.g. "ghcr.io/eevee/backup:latest")
     */
    image: string;
}
export interface backupscheduleStatus {
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
     * Timestamp of the last successful backup
     */
    lastBackup?: string;
    /**
     * Name of the managed K8s CronJob
     */
    cronJobName?: string;
}
export declare function toJson_backupscheduleStatus(obj: backupscheduleStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
