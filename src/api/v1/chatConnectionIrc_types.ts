'use strict';

// Kind: chatconnectionirc
// Group: eevee
// Version: v1
// Domain: bot

import * as cdk8splus from 'cdk8s-plus-33';
import KubernetesObject from '@thehonker/k8s-operator';
import { V1ObjectMeta } from '@kubernetes/client-node';

import { ApiObject, ApiObjectMetadata, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';

import { StatusReasons } from './enums/index.mjs';

export interface chatconnectionircResource extends KubernetesObject {
  spec: chatconnectionircSpec;
  status: chatconnectionircStatus;
  metadata?: V1ObjectMeta | undefined;
}

export class ApiResource implements cdk8splus.IApiResource {
  apiGroup: string = 'eevee.bot';
  resourceType: string = 'chatconnectionirc';
}

export class chatconnectionirc
  extends ApiObject
  implements chatconnectionircSpec
{
  public connections: IrcConnection[];

  /**
   * Returns the apiVersion and kind for "chatconnectionirc"
   */
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'eevee.bot/v1',
    kind: 'chatconnectionirc',
  };

  /**
   * Renders a Kubernetes manifest for "chatconnectionirc".
   *
   * This can be used to inline resource manifests inside other objects (e.g. as templates).
   *
   * @param props initialization props
   */
  public static manifest(props: chatconnectionircProps): unknown {
    return {
      ...chatconnectionirc.GVK,
      ...toJson_chatconnectionircProps(props),
    };
  }

  /**
   * Defines a "chatconnectionirc" API object
   * @param scope the scope in which to define this object
   * @param id a scope-local name for the object
   * @param props initialization props
   */
  public constructor(
    scope: Construct,
    id: string,
    props: chatconnectionircProps
  ) {
    super(scope, id, {
      ...chatconnectionirc.GVK,
      ...props,
    });
    this.connections = props?.spec?.connections || [];
  }

  /**
   * Renders the object to Kubernetes JSON.
   */
  public toJson(): unknown {
    const resolved = super.toJson();

    return {
      ...chatconnectionirc.GVK,
      ...toJson_chatconnectionircProps(resolved),
    };
  }
}

export interface chatconnectionircProps {
  readonly metadata?: ApiObjectMetadata;
  readonly spec?: chatconnectionircSpec;
}

export function toJson_chatconnectionircProps(
  obj: chatconnectionircProps | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    metadata: obj.metadata,
    spec: toJson_chatconnectionircSpec(obj.spec),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_chatconnectionircSpec(
  obj: chatconnectionircSpec | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    ipcConfig: obj.ipcConfig,
    image: obj.image,
    connections: obj.connections?.map(toJson_IrcConnection),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface chatconnectionircSpec {
  /**
   * IPC configuration name
   */
  ipcConfig?: string;

  /**
   * Image name and tag for the IRC connection instance
   */
  image?: string;

  /**
   * List of IRC connections
   */
  connections?: IrcConnection[];
}

export interface IrcConnection {
  /**
   * Display name for this network
   */
  name: string;

  /**
   * Enable this connection
   */
  enabled: boolean;

  /**
   * IRC connection configuration
   */
  irc: IrcConfig;

  /**
   * IRC Ident information
   */
  ident: IrcIdent;

  /**
   * RBAC configuration
   */
  rbac?: IrcRbac;

  /**
   * Actions to take after connecting to the server
   */
  postConnect?: IrcPostConnectAction[];

  /**
   * Send broadcast events for all received messages
   */
  broadcastMessages?: boolean;

  /**
   * Settings related to command modules
   */
  commands?: IrcCommands;
}

export interface IrcConfig {
  /**
   * Host to connect to
   */
  host: string;

  /**
   * Port
   */
  port: number;

  /**
   * SSL
   */
  ssl: boolean;

  /**
   * Auto reconnect
   */
  autoReconnect?: boolean;

  /**
   * Auto reconnect wait time in milliseconds
   */
  autoReconnectWait?: number;

  /**
   * Auto reconnect max retries
   */
  autoReconnectMaxRetries?: number;

  /**
   * Auto rejoin channels
   */
  autoRejoin?: boolean;

  /**
   * Auto rejoin wait time in milliseconds
   */
  autoRejoinWait?: number;

  /**
   * Auto rejoin max retries
   */
  autoRejoinMaxRetries?: number;

  /**
   * Ping interval in seconds
   */
  pingInterval?: number;

  /**
   * Ping timeout in seconds
   */
  pingTimeout?: number;
}

export interface IrcIdent {
  /**
   * Nick to use on this network
   */
  nick: string;

  /**
   * Username
   */
  username: string;

  /**
   * GECOS (real name)
   */
  gecos: string;

  /**
   * Client version (defaults to bot version if not defined)
   */
  version?: string;

  /**
   * Quit message (defaults to bot version if not defined)
   */
  quitMsg?: string;
}

export interface IrcRbac {
  /**
   * Users configuration
   */
  users?: Record<string, IrcUser>;
}

export interface IrcUser {
  /**
   * Authentication method. Currently only "ident" is supported
   */
  auth: string;

  /**
   * Ident string
   */
  ident: string;

  /**
   * Groups
   */
  groups?: string[];
}

export interface IrcPostConnectAction {
  /**
   * Action to perform
   */
  action: 'msg' | 'join';

  /**
   * Message content (as object with channel, msg, and secretKeyRef)
   */
  msg?: IrcPostConnectMessage;

  /**
   * Channels to join
   */
  join?: IrcChannel[];
}

export interface IrcPostConnectMessage {
  /**
   * Channel or user to send message to
   */
  channel?: string;

  /**
   * Message content (as string)
   */
  msg?: string;

  /**
   * Secret key reference for message content
   */
  secretKeyRef?: {
    /**
     * Reference to k8s secret
     */
    secret: cdk8splus.k8s.SecretReference;

    /**
     * Key in the secret to use
     */
    key: string;
  };
}

export interface IrcChannel {
  /**
   * Channel name
   */
  channel: string;

  /**
   * Secret key reference for channel join key
   */
  secretKeyRef?: {
    /**
     * Reference to k8s secret
     */
    secret: cdk8splus.k8s.SecretReference;

    /**
     * Key in the secret to use
     */
    key: string;
  };
}

export interface IrcCommands {
  /**
   * Common prefix regex to add to registered command regexes
   */
  commonPrefixRegex?: string;
}

export function toJson_IrcConnection(
  obj: IrcConnection | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    name: obj.name,
    enabled: obj.enabled,
    irc: toJson_IrcConfig(obj.irc),
    ident: toJson_IrcIdent(obj.ident),
    rbac: toJson_IrcRbac(obj.rbac),
    postConnect: obj.postConnect?.map(toJson_IrcPostConnectAction),
    broadcastMessages: obj.broadcastMessages,
    commands: toJson_IrcCommands(obj.commands),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_IrcConfig(
  obj: IrcConfig | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    host: obj.host,
    port: obj.port,
    ssl: obj.ssl,
    autoReconnect: obj.autoReconnect,
    autoReconnectWait: obj.autoReconnectWait,
    autoReconnectMaxRetries: obj.autoReconnectMaxRetries,
    autoRejoin: obj.autoRejoin,
    autoRejoinWait: obj.autoRejoinWait,
    autoRejoinMaxRetries: obj.autoRejoinMaxRetries,
    pingInterval: obj.pingInterval,
    pingTimeout: obj.pingTimeout,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_IrcIdent(
  obj: IrcIdent | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    nick: obj.nick,
    username: obj.username,
    gecos: obj.gecos,
    version: obj.version,
    quitMsg: obj.quitMsg,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_IrcRbac(
  obj: IrcRbac | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    users: obj.users,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_IrcPostConnectMessage(
  obj: IrcPostConnectMessage | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    channel: obj.channel,
    msg: obj.msg,
    secretKeyRef: obj.secretKeyRef,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_IrcPostConnectAction(
  obj: IrcPostConnectAction | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    action: obj.action,
    msg: obj.msg ? toJson_IrcPostConnectMessage(obj.msg) : undefined,
    join: obj.join?.map(toJson_IrcChannel),
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_IrcChannel(
  obj: IrcChannel | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    channel: obj.channel,
    secretKeyRef: obj.secretKeyRef,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export function toJson_IrcCommands(
  obj: IrcCommands | undefined
): Record<string, unknown> | undefined {
  if (obj === undefined) {
    return undefined;
  }
  const result = {
    commonPrefixRegex: obj.commonPrefixRegex,
  };
  // filter undefined values
  return Object.entries(result).reduce(
    (r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }),
    {}
  );
}

export interface chatconnectionircStatus {
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
  name: 'chatconnectionirc',
  plural: 'chatconnectionircs',
  group: 'eevee.bot',
  version: 'v1',
  scope: 'Namespaced',
  shortName: 'chatconnectionirc',
};
