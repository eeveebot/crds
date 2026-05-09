'use strict';

// Kind: s3store
// Group: eevee
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

export interface s3storeResource extends KubernetesObject {
  spec: s3storeSpec;
  status: s3storeStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'eevee.bot';
  resourceType: string = 's3stores';

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

export class s3store extends ApiObject implements s3storeSpec {
  public endpoint: string;
  public accessId: S3SecretKeyRef;
  public accessKey: S3SecretKeyRef;
  public bucket: string;
  public prefix?: string;
  public pathStyle?: boolean;

  /**
   * Returns the apiVersion and kind for "s3store"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 's3stores',
  };

  /**
   * Renders a Kubernetes manifest for "s3store".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: s3storeProps): unknown {
    return {
      ...s3store.GVK,
      ...toJson_s3storeProps(props),
    };
  }

  /**
   * Defines a "s3store" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: s3storeProps) {
    super(scope, id, {
      ...s3store.GVK,
      ...props,
    });
    this.endpoint = props?.spec?.endpoint || '';
    this.accessId = props?.spec?.accessId!;
    this.accessKey = props?.spec?.accessKey!;
    this.bucket = props?.spec?.bucket || '';
    this.prefix = props?.spec?.prefix;
    this.pathStyle = props?.spec?.pathStyle || false;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...s3store.GVK,
      ...toJson_s3storeProps(resolved),
    };
  }
}

export interface s3storeProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: s3storeSpec;
}

export function toJson_s3storeProps(
  obj: s3storeProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_s3storeSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_s3storeSpec(
  obj: s3storeSpec | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    endpoint: obj.endpoint,
    accessId: toJson_S3SecretKeyRef(obj.accessId),
    accessKey: toJson_S3SecretKeyRef(obj.accessKey),
    bucket: obj.bucket,
    prefix: obj.prefix,
    pathStyle: obj.pathStyle,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

// --- Nested types ---

export interface S3SecretKeyRef {
  /**
   * Reference to a K8s Secret containing the credential value
   */
  secretKeyRef: {
    secret: cdk8splus.k8s.SecretReference;
    key: string;
  };
}

export function toJson_S3SecretKeyRef(
  obj: S3SecretKeyRef | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    secretKeyRef: obj.secretKeyRef,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

// --- Spec & Status interfaces ---

export interface s3storeSpec {
  /**
   * S3-compatible endpoint URL
   * (e.g. "https://s3.amazonaws.com" or "https://minio.example.com")
   */
  endpoint: string;

  /**
   * Reference to a Secret containing the S3 access key ID
   */
  accessId: S3SecretKeyRef;

  /**
   * Reference to a Secret containing the S3 secret access key
   */
  accessKey: S3SecretKeyRef;

  /**
   * S3 bucket name
   */
  bucket: string;

  /**
   * Common file prefix within the bucket for all objects
   * managed by this store (e.g. "eevee/backups/")
   */
  prefix?: string;

  /**
   * Use path-style addressing (host_base/bucket) instead of
   * virtual-hosted-style (bucket.host_base). Required for MinIO
   * and many S3-compatible stores.
   * Default: false
   */
  pathStyle?: boolean;
}

export type s3storeStatusCondition = {
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

export interface s3storeStatus {
  conditions: s3storeStatusCondition[];
}

export function toJson_s3storeStatus(
  obj: s3storeStatus | undefined
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
  name: 's3store',
  plural: 's3stores',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 's3store',
};
