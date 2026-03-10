'use strict';

// Kind: IpcConfig
// Group: eevee.bot
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import {
  StatusReasons,
} from './enums/index.mjs';

export interface IpcConfigResource extends KubernetesObject {
  spec: IpcConfigSpec;
  status: IpcConfigStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'eevee.bot';
  resourceType: string = 'ipcConfig';
}

export class IpcConfig extends ApiObject implements IpcConfigSpec {
  public nats?: NatsConfig;

  /**
   * Returns the apiVersion and kind for "ipcConfig"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'IpcConfig',
  }

  /**
   * Renders a Kubernetes manifest for "ipcConfig".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: IpcConfigProps): unknown {
    return {
      ...IpcConfig.GVK,
      ...toJson_IpcConfigProps(props),
    };
  }

  /**
   * Defines a "ipcConfig" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: IpcConfigProps) {
    super(scope, id, {
      ...IpcConfig.GVK,
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
      ...IpcConfig.GVK,
      ...toJson_IpcConfigProps(resolved),
    };
  }
}

export interface IpcConfigProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: IpcConfigSpec;
}

export function toJson_IpcConfigProps(obj: IpcConfigProps | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_IpcConfigSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export function toJson_IpcConfigSpec(obj: IpcConfigSpec | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'nats': toJson_NatsConfig(obj.nats),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export interface IpcConfigSpec {
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
   * Should the eevee-operator deploy a NATS cluster for us?
   */
  enabled: boolean;

  /**
   * NATS deployment config - direct passthrough to NATS Helm chart
   */
  spec?: unknown;
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

export function toJson_NatsConfig(obj: NatsConfig | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'managed': toJson_ManagedNatsConfig(obj.managed),
    'token': toJson_NatsTokenConfig(obj.token),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export function toJson_ManagedNatsConfig(obj: ManagedNatsConfig | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'enabled': obj.enabled,
    'spec': obj.spec,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export function toJson_NatsTokenConfig(obj: NatsTokenConfig | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'generate': obj.generate,
    'secretKeyRef': obj.secretKeyRef,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export interface IpcConfigStatus {
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
  name: 'ipcConfig',
  plural: 'ipcConfigs',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'ipcConfig',
};
