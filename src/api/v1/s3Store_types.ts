'use strict';

// Kind: S3Store
// Group: eevee
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

export interface S3StoreResource extends KubernetesObject {
  spec: S3StoreSpec;
  status: S3StoreStatus;
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

export class S3Store extends ApiObject implements S3StoreSpec {
  public endpoint: string;
  public accessId: S3SecretKeyRef;
  public accessKey: S3SecretKeyRef;
  public bucket: string;
  public prefix?: string;
  public region?: string;
  public pathStyle?: boolean;

  /**
   * Returns the apiVersion and kind for "s3store"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'S3Store',
  };

  /**
   * Renders a Kubernetes manifest for "S3Store".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: S3StoreProps): unknown {
    return {
      ...S3Store.GVK,
      ...toJson_S3StoreProps(props),
    };
  }

  /**
   * Defines a "S3Store" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(scope: Construct, id: string, props: S3StoreProps) {
    super(scope, id, {
      ...S3Store.GVK,
      ...props,
    });
    this.endpoint = props?.spec?.endpoint || '';
    this.accessId = props?.spec?.accessId!;
    this.accessKey = props?.spec?.accessKey!;
    this.bucket = props?.spec?.bucket || '';
    this.prefix = props?.spec?.prefix;
    this.region = props?.spec?.region;
    this.pathStyle = props?.spec?.pathStyle || false;
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...S3Store.GVK,
      ...toJson_S3StoreProps(resolved),
    };
  }
}

export interface S3StoreProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: S3StoreSpec;
}

export function toJson_S3StoreProps(
  obj: S3StoreProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_S3StoreSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_S3StoreSpec(
  obj: S3StoreSpec | undefined
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
    region: obj.region,
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

export interface S3StoreSpec {
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
   * S3 region. For AWS, this should match the bucket region.
   * For S3-compatible stores (MinIO, Garage, etc.) the region
   * may not matter — `us-east-1` is used as a default.
   * Default: "us-east-1"
   */
  region?: string;

  /**
   * Use path-style addressing (host_base/bucket) instead of
   * virtual-hosted-style (bucket.host_base). Required for MinIO
   * and many S3-compatible stores.
   * Default: false
   */
  pathStyle?: boolean;
}

export type S3StoreStatusCondition = {
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

export interface S3StoreStatus {
  conditions: S3StoreStatusCondition[];
}

export function toJson_S3StoreStatus(
  obj: S3StoreStatus | undefined
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
  name: 'S3Store',
  plural: 's3stores',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'S3Store',
};
