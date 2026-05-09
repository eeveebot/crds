'use strict';

export enum StatusReasons {
  created = 'created',
  updated = 'updated',
  deleted = 'deleted',
  modified = 'modified',
  unknown = 'unknown',
}

// Shared types referenced across multiple CRD types

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
