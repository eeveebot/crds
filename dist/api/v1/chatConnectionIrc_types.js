'use strict';
import { ApiObject } from 'cdk8s';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 'ChatConnectionIrc';
}
export class ChatConnectionIrc extends ApiObject {
    Connections;
    /**
     * Returns the apiVersion and kind for "ChatConnectionIrc"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'ChatConnectionIrc',
    };
    /**
     * Renders a Kubernetes manifest for "ChatConnectionIrc".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...ChatConnectionIrc.GVK,
            ...toJson_ChatConnectionIrcProps(props),
        };
    }
    /**
     * Defines a "ChatConnectionIrc" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...ChatConnectionIrc.GVK,
            ...props,
        });
        this.Connections = props?.spec?.Connections || [];
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...ChatConnectionIrc.GVK,
            ...toJson_ChatConnectionIrcProps(resolved),
        };
    }
}
export function toJson_ChatConnectionIrcProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'metadata': obj.metadata,
        'spec': toJson_ChatConnectionIrcSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_ChatConnectionIrcSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'connections': obj.Connections?.map(toJson_IrcConnection),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcConnection(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'name': obj.name,
        'enabled': obj.enabled,
        'irc': toJson_IrcConfig(obj.irc),
        'ident': toJson_IrcIdent(obj.ident),
        'rbac': toJson_IrcRbac(obj.rbac),
        'postConnect': obj.postConnect?.map(toJson_IrcPostConnectAction),
        'broadcastMessages': obj.broadcastMessages,
        'commands': toJson_IrcCommands(obj.commands),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcConfig(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'host': obj.host,
        'port': obj.port,
        'ssl': obj.ssl,
        'autoReconnect': obj.autoReconnect,
        'autoReconnectWait': obj.autoReconnectWait,
        'autoReconnectMaxRetries': obj.autoReconnectMaxRetries,
        'autoRejoin': obj.autoRejoin,
        'autoRejoinWait': obj.autoRejoinWait,
        'autoRejoinMaxRetries': obj.autoRejoinMaxRetries,
        'pingInterval': obj.pingInterval,
        'pingTimeout': obj.pingTimeout,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcIdent(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'nick': obj.nick,
        'username': obj.username,
        'gecos': obj.gecos,
        'version': obj.version,
        'quitMsg': obj.quitMsg,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcRbac(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'users': obj.users,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcPostConnectAction(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'action': obj.action,
        'channel': obj.channel,
        'msg': obj.msg,
        'secretKeyRef': obj.secretKeyRef,
        'channels': obj.channels?.map(toJson_IrcChannel),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcChannel(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'channel': obj.channel,
        'secretKeyRef': obj.secretKeyRef,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export function toJson_IrcCommands(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        'commonPrefixRegex': obj.commonPrefixRegex,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined) ? r : ({ ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'ChatConnectionIrc',
    plural: 'ChatConnectionIrcs',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'ChatConnectionIrc',
};
