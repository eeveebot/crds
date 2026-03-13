'use strict';

// Kind: router
// Group: eevee
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { StatusReasons } from './enums/index.mjs';

export interface routerResource extends KubernetesObject {
  spec: routerSpec;
  status: routerStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'eevee.bot';
  resourceType: string = 'routers';

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

export class router extends ApiObject implements routerSpec {
  public size: number;
  public image: string;
  public pullPolicy: string;
  public metrics: boolean;
  public metricsPort: number;
  public moduleConfig?: Record<string, unknown>;

  /**
   * Returns the apiVersion and kind for "router"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'routers',
  };

  /**
   * Renders a Kubernetes manifest for "router".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: routerProps): unknown {
    return {
      ...router.GVK,
      ...toJson_routerProps(props),
    };
  }

  /**
   * Defines a "router" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: routerProps) {
    super(scope, id, {
      ...router.GVK,
      ...props,
    });
    this.size = props?.spec?.size || 1;
    this.image = props?.spec?.image || 'ghcr.io/eeveebot/router:latest';
    this.pullPolicy = props?.spec?.pullPolicy || 'Always';
    this.metrics = props?.spec?.metrics || false;
    this.metricsPort = props?.spec?.metricsPort || 8080;
    this.moduleConfig = props?.spec?.moduleConfig;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...router.GVK,
      ...toJson_routerProps(resolved),
    };
  }
}

export interface routerProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: routerSpec;
}

export function toJson_routerProps(
  obj: routerProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_routerSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_routerSpec(
  obj: routerSpec | undefined
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
    moduleConfig: obj.moduleConfig,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface routerSpec {
  /**
   * Size defines the number of router instances
   * Default: 1
   */
  size?: number;

  /**
   * Image defines the container image to use
   * Default: "ghcr.io/eeveebot/router:latest"
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
   * ModuleConfig is a passthrough field for arbitrary YAML configuration
   * that will be passed directly to the router
   */
  moduleConfig?: Record<string, unknown>;
}

export interface routerStatus {
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

export function toJson_routerStatus(
  obj: routerStatus | undefined
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
  name: 'router',
  plural: 'routers',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'router',
};
