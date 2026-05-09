'use strict';

// Kind: BackupSchedule
// Group: eevee
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { S3StoreReference, toJson_S3StoreReference } from './enums/index.mjs';

export interface BackupScheduleResource extends KubernetesObject {
  spec: BackupScheduleSpec;
  status: BackupScheduleStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'eevee.bot';
  resourceType: string = 'backupschedules';

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

export class BackupSchedule extends ApiObject implements BackupScheduleSpec {
  public schedule: string;
  public s3Store: S3StoreReference;
  public image: string;

  /**
   * Returns the apiVersion and kind for "backupschedule"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'BackupSchedule',
  };

  /**
   * Renders a Kubernetes manifest for "BackupSchedule".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: BackupScheduleProps): unknown {
    return {
      ...BackupSchedule.GVK,
      ...toJson_BackupScheduleProps(props),
    };
  }

  /**
   * Defines a "BackupSchedule" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: BackupScheduleProps) {
    super(scope, id, {
      ...BackupSchedule.GVK,
      ...props,
    });
    this.schedule = props?.spec?.schedule || '';
    this.s3Store = props?.spec?.s3Store!;
    this.image = props?.spec?.image || '';
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...BackupSchedule.GVK,
      ...toJson_BackupScheduleProps(resolved),
    };
  }
}

export interface BackupScheduleProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: BackupScheduleSpec;
}

export function toJson_BackupScheduleProps(
  obj: BackupScheduleProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_BackupScheduleSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_BackupScheduleSpec(
  obj: BackupScheduleSpec | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    schedule: obj.schedule,
    s3Store: toJson_S3StoreReference(obj.s3Store),
    image: obj.image,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

// --- Spec & Status interfaces ---

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

export function toJson_BackupScheduleStatus(
  obj: BackupScheduleStatus | undefined
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
  name: 'BackupSchedule',
  plural: 'backupschedules',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'BackupSchedule',
};
