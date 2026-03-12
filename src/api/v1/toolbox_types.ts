'use strict';

// Kind: toolbox
// Group: eevee
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { StatusReasons } from './enums/index.mjs';

export interface toolboxResource extends KubernetesObject {
  spec: toolboxSpec;
  status: toolboxStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'eevee.bot';
  resourceType: string = 'toolbox';

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

export class toolbox extends ApiObject implements toolboxSpec {
  public size: number;
  public image: string;
  public pullPolicy: string;
  public metrics: boolean;
  public metricsPort: number;
  public ipcConfig: string;

  /**
   * Returns the apiVersion and kind for "toolbox"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'toolbox',
  };

  /**
   * Renders a Kubernetes manifest for "toolbox".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: toolboxProps): unknown {
    return {
      ...toolbox.GVK,
      ...toJson_toolboxProps(props),
    };
  }

  /**
   * Defines a "toolbox" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: toolboxProps) {
    super(scope, id, {
      ...toolbox.GVK,
      ...props,
    });
    this.size = props?.spec?.size || 1;
    this.image = props?.spec?.image || 'ghcr.io/eeveebot/cli:latest';
    this.pullPolicy = props?.spec?.pullPolicy || 'Always';
    this.metrics = props?.spec?.metrics || false;
    this.metricsPort = props?.spec?.metricsPort || 8080;
    this.ipcConfig = props?.spec?.ipcConfig || '';
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...toolbox.GVK,
      ...toJson_toolboxProps(resolved),
    };
  }
}

export interface toolboxProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: toolboxSpec;
}

export function toJson_toolboxProps(
  obj: toolboxProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_toolboxSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_toolboxSpec(
  obj: toolboxSpec | undefined
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
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface toolboxSpec {
  /**
   * Size defines the number of toolbox instances
   */
  size?: number;

  /**
   * Image defines the container image to use
   * Default: "ghcr.io/eeveebot/cli:latest"
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
}

export interface toolboxStatus {
  /**
   * Conditions represent the latest available observations of a toolbox's current state.
   * Known condition types are: "Available", "Progressing", and "Degraded"
   */
  conditions?: {
    /**
     * Type of condition
     */
    type: string;

    /**
     * Status of the condition, one of True, False, Unknown
     */
    status: string;

    /**
     * Last time the condition transitioned from one status to another
     */
    lastTransitionTime: Date;

    /**
     * Unique, one-word, CamelCase reason for the condition's last transition
     */
    reason: StatusReasons;

    /**
     * Human-readable message indicating details about last transition
     */
    message: string;

    /**
     * ObservedGeneration represents the .metadata.generation that the condition was set based upon
     */
    observedGeneration?: number;
  }[];
}

export function toJson_toolboxStatus(
  obj: toolboxStatus | undefined
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
  name: 'toolbox',
  plural: 'toolboxes',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'toolbox',
};
