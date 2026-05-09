import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { S3StoreReference } from './enums/index.mjs';
export interface BackupScheduleResource extends KubernetesObject {
    spec: BackupScheduleSpec;
    status: BackupScheduleStatus;
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
export declare class BackupSchedule extends ApiObject implements BackupScheduleSpec {
    schedule: string;
    s3Store: S3StoreReference;
    image: string;
    /**
     * Returns the apiVersion and kind for "backupschedule"
     */
    static readonly GVK: GroupVersionKind;
    /**
     * Renders a Kubernetes manifest for "BackupSchedule".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props: BackupScheduleProps): unknown;
    /**
     * Defines a "BackupSchedule" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope: Construct, id: string, props: BackupScheduleProps);
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson(): unknown;
}
export interface BackupScheduleProps {
    readonly metadata?: ApiObjectMetadata;
    readonly spec?: BackupScheduleSpec;
}
export declare function toJson_BackupScheduleProps(obj: BackupScheduleProps | undefined): Record<string, unknown> | undefined;
export declare function toJson_BackupScheduleSpec(obj: BackupScheduleSpec | undefined): Record<string, unknown> | undefined;
export interface BackupScheduleSpec {
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
export type BackupScheduleStatusCondition = {
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
export interface BackupScheduleStatus {
    conditions: BackupScheduleStatusCondition[];
}
export declare function toJson_BackupScheduleStatus(obj: BackupScheduleStatus | undefined): Record<string, unknown> | undefined;
export declare const details: {
    name: string;
    plural: string;
    group: string;
    version: string;
    scope: string;
    shortName: string;
};
