import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta, V1PersistentVolumeClaimSpec, V1Probe } from '@kubernetes/client-node';
import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import { S3StoreReference } from './enums/index.mjs';
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
    envSecret?: cdk8splus.k8s.SecretReference;
    livenessProbe?: V1Probe;
    readinessProbe?: V1Probe;
    startupProbe?: V1Probe;
    backupSchedule?: BackupScheduleReference;
    bootstrapFromBackup?: BootstrapFromBackup;
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
    /**
     * EnvSecret defines optional secrets to be injected as environment variables
     */
    envSecret?: cdk8splus.k8s.SecretReference;
    /**
     * LivenessProbe defines the liveness probe configuration for the module container.
     * If not set, the operator will apply default probes.
     */
    livenessProbe?: V1Probe;
    /**
     * ReadinessProbe defines the readiness probe configuration for the module container.
     * If not set, the operator will apply default probes.
     */
    readinessProbe?: V1Probe;
    /**
     * StartupProbe defines the startup probe configuration for the module container.
     * If not set, no startup probe is configured.
     */
    startupProbe?: V1Probe;
    /**
     * Optional reference to a backupschedule. When set, the operator will
     * configure the backup CronJob to target this module's PVC.
     */
    backupSchedule?: BackupScheduleReference;
    /**
     * When set, the operator will restore the latest backup from S3 into
     * this module's PVC before starting the deployment for the first time.
     * Subsequent reconciliations ignore this field (no re-restore).
     */
    bootstrapFromBackup?: BootstrapFromBackup;
}
export interface BackupScheduleReference {
    /**
     * Name of the backupschedule resource in the same namespace
     */
    name: string;
}
export declare function toJson_BackupScheduleReference(obj: BackupScheduleReference | undefined): Record<string, unknown> | undefined;
export interface BootstrapFromBackup {
    /**
     * Reference to the s3store CR instance containing the backup
     */
    s3Store: S3StoreReference;
    /**
     * Container image to use for the restore job
     * (e.g. "ghcr.io/eevee/backup:latest")
     */
    image: string;
}
export declare function toJson_BootstrapFromBackup(obj: BootstrapFromBackup | undefined): Record<string, unknown> | undefined;
export type botmoduleStatusCondition = {
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
export interface botmoduleStatus {
    conditions: botmoduleStatusCondition[];
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
