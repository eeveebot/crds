'use strict';

// Kind: Toolbox
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

export interface ToolboxResource extends KubernetesObject {
  spec: ToolboxSpec;
  status: ToolboxStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'eevee.bot';
  resourceType: string = 'Toolbox';
}

export class Toolbox extends ApiObject implements ToolboxSpec {
  public size: number;
  public containerImage: string;
  public pullPolicy: string;
  public natsAuthSecret: string;
  public metrics: boolean;
  public ipcConfig: string;

  /**
   * Returns the apiVersion and kind for "Toolbox"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'Toolbox',
  }

  /**
   * Renders a Kubernetes manifest for "Toolbox".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: ToolboxProps): unknown {
    return {
      ...Toolbox.GVK,
      ...toJson_ToolboxProps(props),
    };
  }

  /**
   * Defines a "Toolbox" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: ToolboxProps) {
    super(scope, id, {
      ...Toolbox.GVK,
      ...props,
    });
    this.size = props?.spec?.size || 1;
    this.containerImage = props?.spec?.containerImage || 'ghcr.io/eeveebot/cli:latest';
    this.pullPolicy = props?.spec?.pullPolicy || 'Always';
    this.metrics = props?.spec?.metrics || false;
    this.ipcConfig = props?.spec?.ipcConfig || '';
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...Toolbox.GVK,
      ...toJson_ToolboxProps(resolved),
    };
  }
}

export interface ToolboxProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: ToolboxSpec;
}

export function toJson_ToolboxProps(obj: ToolboxProps | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'metadata': obj.metadata,
    'spec': toJson_ToolboxSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export function toJson_ToolboxSpec(obj: ToolboxSpec | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'size': obj.size,
    'containerImage': obj.containerImage,
    'pullPolicy': obj.pullPolicy,
    'metrics': obj.metrics,
    'ipcConfig': obj.ipcConfig,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export interface ToolboxSpec {
  /**
   * Size defines the number of Toolbox instances
   */
  size?: number;

  /**
   * ContainerImage defines the container image to use
   * Default: "ghcr.io/eeveebot/cli:latest"
   */
  containerImage?: string;

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
   * IPC configuration name
   */
  ipcConfig?: string;
}

export interface ToolboxStatus {
  /**
   * Conditions represent the latest available observations of a Toolbox's current state.
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

export function toJson_ToolboxStatus(obj: ToolboxStatus | undefined): Record<string, unknown> | undefined {
  if (obj === undefined) { return undefined; }
  const result = {
    'conditions': obj.conditions,
  };
  // filter undefined values
  return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}

export const details = {
  name: 'Toolbox',
  plural: 'Toolboxes',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'toolbox',
};
