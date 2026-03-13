'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 'chatconnectionircs';
    /**
     * Return the IApiResource this object represents.
     */
    asApiResource() {
        return this;
    }
    /**
     * Return the non resource url this object represents.
     */
    asNonApiResource() {
        return undefined;
    }
}
export class chatconnectionirc extends ApiObject {
    connections;
    metrics;
    metricsPort;
    /**
     * Returns the apiVersion and kind for "chatconnectionirc"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'chatconnectionircs',
    };
    /**
     * Renders a Kubernetes manifest for "chatconnectionirc".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
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
    constructor(scope, id, props) {
        super(scope, id, {
            ...chatconnectionirc.GVK,
            ...props,
        });
        this.connections = props?.spec?.connections || [];
        this.metrics = props?.spec?.metrics || false;
        this.metricsPort = props?.spec?.metricsPort || 8080;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...chatconnectionirc.GVK,
            ...toJson_chatconnectionircProps(resolved),
        };
    }
}
export function toJson_chatconnectionircProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_chatconnectionircSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_chatconnectionircSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        ipcConfig: obj.ipcConfig,
        image: obj.image,
        connections: obj.connections?.map(toJson_IrcConnection),
        metrics: obj.metrics,
        metricsPort: obj.metricsPort,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcConnection(obj) {
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
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcConfig(obj) {
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
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcIdent(obj) {
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
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcRbac(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        users: obj.users,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcPostConnectMessage(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        channel: obj.channel,
        msg: obj.msg,
        secretKeyRef: obj.secretKeyRef,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcPostConnectAction(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        action: obj.action,
        msg: obj.msg ? toJson_IrcPostConnectMessage(obj.msg) : undefined,
        join: obj.join?.map(toJson_IrcChannel),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcChannel(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        channel: obj.channel,
        secretKeyRef: obj.secretKeyRef,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcCommands(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        commonPrefixRegex: obj.commonPrefixRegex,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'chatconnectionirc',
    plural: 'chatconnectionircs',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'chatconnectionirc',
};
