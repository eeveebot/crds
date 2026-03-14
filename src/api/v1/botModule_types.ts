'use strict';

// Kind: botmodule
// Group: eevee
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import {
  V1ObjectMeta,
  V1PersistentVolumeClaimSpec,
} from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { StatusReasons } from './enums/index.mjs';

export interface botmoduleResource extends KubernetesObject {
  spec: botmoduleSpec;
  status: botmoduleStatus;
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

export class botmodule extends ApiObject implements botmoduleSpec {
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

  /**
   * Returns the apiVersion and kind for "botmodule"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'botmodules',
  };

  /**
   * Renders a Kubernetes manifest for "botmodule".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: botmoduleProps): unknown {
    return {
      ...botmodule.GVK,
      ...toJson_botmoduleProps(props),
    };
  }

  /**
   * Defines a "botmodule" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: botmoduleProps) {
    super(scope, id, {
      ...botmodule.GVK,
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
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...botmodule.GVK,
      ...toJson_botmoduleProps(resolved),
    };
  }
}

export interface botmoduleProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: botmoduleSpec;
}

export function toJson_botmoduleProps(
  obj: botmoduleProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_botmoduleSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_botmoduleSpec(
  obj: botmoduleSpec | undefined
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
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

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

export function toJson_botmoduleStatus(
  obj: botmoduleStatus | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    lastTransitionTime: obj.lastTransitionTime,
    message: obj.message,
    reason: obj.reason,
    observedGeneration: obj.observedGeneration,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export const details = {
  name: 'botmodule',
  plural: 'botmodules',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'botmodule',
};
