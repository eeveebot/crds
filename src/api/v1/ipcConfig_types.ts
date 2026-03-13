'use strict';

// Kind: ipcconfig
// Group: eevee
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { StatusReasons } from './enums/index.mjs';

export interface ipcconfigResource extends KubernetesObject {
  spec: ipcconfigSpec;
  status: ipcconfigStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'eevee.bot';
  resourceType: string = 'ipcconfigs';

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

export class ipcconfig extends ApiObject implements ipcconfigSpec {
  public nats?: NatsConfig;

  /**
   * Returns the apiVersion and kind for "ipcConfig"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'ipcconfigs',
  };

  /**
   * Renders a Kubernetes manifest for "ipcConfig".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: ipcconfigProps): unknown {
    return {
      ...ipcconfig.GVK,
      ...toJson_ipcconfigProps(props),
    };
  }

  /**
   * Defines a "ipcConfig" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: ipcconfigProps) {
    super(scope, id, {
      ...ipcconfig.GVK,
      ...props,
    });
    this.nats = props?.spec?.nats;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...ipcconfig.GVK,
      ...toJson_ipcconfigProps(resolved),
    };
  }
}

export interface ipcconfigProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: ipcconfigSpec;
}

export function toJson_ipcconfigProps(
  obj: ipcconfigProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_ipcconfigSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_ipcconfigSpec(
  obj: ipcconfigSpec | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    nats: toJson_NatsConfig(obj.nats),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface ipcconfigSpec {
  /**
   * NATS configuration
   */
  nats?: NatsConfig;
}

export interface NatsConfig {
  /**
   * Managed NATS deployment configuration
   */
  managed?: ManagedNatsConfig;

  /**
   * NATS token authentication configuration
   */
  token?: NatsTokenConfig;
}

export interface ManagedNatsConfig {
  /**
   * Should the eevee-operator deploy a NATS server for us?
   */
  enabled: boolean;

  /**
   * NATS container image to use
   */
  image?: string;
}

export interface NatsTokenConfig {
  /**
   * Should the eevee-operator generate a token for NATS auth?
   */
  generate: boolean;

  /**
   * Where to access the NATS auth token
   */
  secretKeyRef?: {
    secret: cdk8splus.k8s.SecretReference;
    key: string;
  };
}

export function toJson_NatsConfig(
  obj: NatsConfig | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    managed: toJson_ManagedNatsConfig(obj.managed),
    token: toJson_NatsTokenConfig(obj.token),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_ManagedNatsConfig(
  obj: ManagedNatsConfig | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    enabled: obj.enabled,
    image: obj.image,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_NatsTokenConfig(
  obj: NatsTokenConfig | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    generate: obj.generate,
    secretKeyRef: obj.secretKeyRef,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface ipcconfigStatus {
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

export const details = {
  name: 'ipcconfig',
  plural: 'ipcconfigs',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'ipcconfig',
};
