'use strict';

// Kind: BotModule
// Group: eevee
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import {
  V1ObjectMeta,
  V1PersistentVolumeClaimSpec,
  V1Probe,
} from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { S3StoreReference, toJson_S3StoreReference } from './enums/index.mjs';

export interface BotModuleResource extends KubernetesObject {
  spec: BotModuleSpec;
  status: BotModuleStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'eevee.bot';
  resourceType: string = 'botmodules';

  /**
   * Return the IApiResource this object represents.
   */
  public asApiResource(): cdk8splus.IApiResource | undefined {
    return this;
  }

  /**
   * Return the non resource url this object represents.
   */
  public asNonApiResource(): string | undefined {
    return undefined;
  }
}

export class BotModule extends ApiObject implements BotModuleSpec {
  public size: number;
  public image: string;
  public pullPolicy: string;
  public metrics: boolean;
  public metricsPort: number;
  public ipcConfig: string;
  public moduleName: string;
  public persistentVolumeClaim?: V1PersistentVolumeClaimSpec;
  public volumeMountPath: string;
  public moduleConfig?: string;
  public mountOperatorApiToken: boolean;
  public enabled: boolean;
  public envSecret?: cdk8splus.k8s.SecretReference;
  public livenessProbe?: V1Probe;
  public readinessProbe?: V1Probe;
  public startupProbe?: V1Probe;
  public backupSchedule?: BackupScheduleReference;
  public bootstrapFromBackup?: BootstrapFromBackup;

  /**
   * Returns the apiVersion and kind for "botmodule"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'BotModule',
  };

  /**
   * Renders a Kubernetes manifest for "BotModule".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: BotModuleProps): unknown {
    return {
      ...BotModule.GVK,
      ...toJson_BotModuleProps(props),
    };
  }

  /**
   * Defines a "BotModule" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: BotModuleProps) {
    super(scope, id, {
      ...BotModule.GVK,
      ...props,
    });
    this.size = props?.spec?.size || 1;
    this.image = props?.spec?.image || 'ghcr.io/eeveebot/echo:latest';
    this.pullPolicy = props?.spec?.pullPolicy || 'Always';
    this.metrics = props?.spec?.metrics || false;
    this.metricsPort = props?.spec?.metricsPort || 8080;
    this.ipcConfig = props?.spec?.ipcConfig || '';
    this.moduleName = props?.spec?.moduleName || '';
    this.persistentVolumeClaim = props?.spec?.persistentVolumeClaim;
    this.volumeMountPath = props?.spec?.volumeMountPath || '/data';
    this.moduleConfig = props?.spec?.moduleConfig;
    this.mountOperatorApiToken = props?.spec?.mountOperatorApiToken || false;
    this.enabled =
      props?.spec?.enabled !== undefined ? props?.spec?.enabled : true;
    this.envSecret = props?.spec?.envSecret;
    this.livenessProbe = props?.spec?.livenessProbe;
    this.readinessProbe = props?.spec?.readinessProbe;
    this.startupProbe = props?.spec?.startupProbe;
    this.backupSchedule = props?.spec?.backupSchedule;
    this.bootstrapFromBackup = props?.spec?.bootstrapFromBackup;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...BotModule.GVK,
      ...toJson_BotModuleProps(resolved),
    };
  }
}

export interface BotModuleProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: BotModuleSpec;
}

export function toJson_BotModuleProps(
  obj: BotModuleProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_BotModuleSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_BotModuleSpec(
  obj: BotModuleSpec | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    size: obj.size,
    image: obj.image,
    pullPolicy: obj.pullPolicy,
    metrics: obj.metrics,
    metricsPort: obj.metricsPort,
    ipcConfig: obj.ipcConfig,
    moduleName: obj.moduleName,
    persistentVolumeClaim: obj.persistentVolumeClaim,
    volumeMountPath: obj.volumeMountPath,
    moduleConfig: obj.moduleConfig,
    mountOperatorApiToken: obj.mountOperatorApiToken,
    enabled: obj.enabled,
    envSecret: obj.envSecret,
    livenessProbe: obj.livenessProbe,
    readinessProbe: obj.readinessProbe,
    startupProbe: obj.startupProbe,
    backupSchedule: toJson_BackupScheduleReference(obj.backupSchedule),
    bootstrapFromBackup: toJson_BootstrapFromBackup(obj.bootstrapFromBackup),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface BotModuleSpec {
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

// --- Nested types for backup fields ---

export interface BackupScheduleReference {
  /**
   * Name of the backupschedule resource in the same namespace
   */
  name: string;
}

export function toJson_BackupScheduleReference(
  obj: BackupScheduleReference | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    name: obj.name,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

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

export function toJson_BootstrapFromBackup(
  obj: BootstrapFromBackup | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    s3Store: toJson_S3StoreReference(obj.s3Store),
    image: obj.image,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export type BotModuleStatusCondition = {
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

export interface BotModuleStatus {
  conditions: BotModuleStatusCondition[];
}

export function toJson_BotModuleStatus(
  obj: BotModuleStatus | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    conditions: obj.conditions,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export const details = {
  name: 'BotModule',
  plural: 'botmodules',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'BotModule',
};
