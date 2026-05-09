'use strict';

// Kind: backuprestore
// Group: eevee
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { StatusReasons } from './enums/index.mjs';

export interface backuprestoreResource extends KubernetesObject {
  spec: backuprestoreSpec;
  status: backuprestoreStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'eevee.bot';
  resourceType: string = 'backuprestores';

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

export class backuprestore extends ApiObject implements backuprestoreSpec {
  public botModule: BotModuleReference;
  public s3Store: S3StoreReference;
  public image: string;
  public backupId?: string;

  /**
   * Returns the apiVersion and kind for "backuprestore"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'backuprestores',
  };

  /**
   * Renders a Kubernetes manifest for "backuprestore".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: backuprestoreProps): unknown {
    return {
      ...backuprestore.GVK,
      ...toJson_backuprestoreProps(props),
    };
  }

  /**
   * Defines a "backuprestore" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: backuprestoreProps) {
    super(scope, id, {
      ...backuprestore.GVK,
      ...props,
    });
    this.botModule = props?.spec?.botModule!;
    this.s3Store = props?.spec?.s3Store!;
    this.image = props?.spec?.image || '';
    this.backupId = props?.spec?.backupId;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...backuprestore.GVK,
      ...toJson_backuprestoreProps(resolved),
    };
  }
}

export interface backuprestoreProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: backuprestoreSpec;
}

export function toJson_backuprestoreProps(
  obj: backuprestoreProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_backuprestoreSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_backuprestoreSpec(
  obj: backuprestoreSpec | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    botModule: toJson_BotModuleReference(obj.botModule),
    s3Store: toJson_S3StoreReference(obj.s3Store),
    image: obj.image,
    backupId: obj.backupId,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

// --- Nested types ---

export interface BotModuleReference {
  /**
   * Name of the botmodule resource in the same namespace
   */
  name: string;
}

export function toJson_BotModuleReference(
  obj: BotModuleReference | undefined
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

export interface S3StoreReference {
  /**
   * Name of the s3store resource in the same namespace
   */
  name: string;
}

export function toJson_S3StoreReference(
  obj: S3StoreReference | undefined
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

// --- Spec & Status interfaces ---

export interface backuprestoreSpec {
  /**
   * Reference to the botmodule whose PVC will be restored
   */
  botModule: BotModuleReference;

  /**
   * Reference to the s3store CR instance containing the backup
   */
  s3Store: S3StoreReference;

  /**
   * Container image to use for the restore job
   * (e.g. "ghcr.io/eevee/backup:latest")
   */
  image: string;

  /**
   * UUID of the specific backup to restore.
   * If omitted, the operator restores the latest backup for this module
   * (determined by listing objects and selecting the most recent by S3 LastModified).
   */
  backupId?: string;
}

export interface backuprestoreStatus {
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
   * Name of the managed K8s Job
   */
  jobName?: string;

  /**
   * UUID of the backup that was restored
   */
  restoredBackupId?: string;

  /**
   * Phase of the restore operation
   * (Pending, Running, Succeeded, Failed)
   */
  phase?: string;
}

export function toJson_backuprestoreStatus(
  obj: backuprestoreStatus | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    lastTransitionTime: obj.lastTransitionTime,
    message: obj.message,
    reason: obj.reason,
    observedGeneration: obj.observedGeneration,
    jobName: obj.jobName,
    restoredBackupId: obj.restoredBackupId,
    phase: obj.phase,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export const details = {
  name: 'backuprestore',
  plural: 'backuprestores',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'backuprestore',
};
