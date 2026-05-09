'use strict';
import { ApiObject } from 'cdk8s';
import { toJson_S3StoreReference } from './enums/index.mjs';
export class ApiResource {
    apiGroup = 'eevee.bot';
    resourceType = 'botmodules';
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
export class BotModule extends ApiObject {
    size;
    image;
    imagePullPolicy;
    pullPolicy;
    metrics;
    metricsPort;
    ipcConfig;
    moduleName;
    persistentVolumeClaim;
    volumeMountPath;
    moduleConfig;
    mountOperatorApiToken;
    enabled;
    envSecret;
    livenessProbe;
    readinessProbe;
    startupProbe;
    backupSchedule;
    bootstrapFromBackup;
    resources;
    /**
     * Returns the apiVersion and kind for "BotModule"
     */
    static GVK = {
        apiVersion: 'eevee.bot/v1',
        kind: 'BotModule',
    };
    /**
     * Renders a Kubernetes manifest for "BotModule".
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
    static manifest(props) {
        return {
            ...BotModule.GVK,
            ...toJson_BotModuleProps(props),
        };
    }
    /**
     * Defines a "BotModule" API object
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
    constructor(scope, id, props) {
        super(scope, id, {
            ...BotModule.GVK,
            ...props,
        });
        this.size = props?.spec?.size || 1;
        this.image = props?.spec?.image;
        this.imagePullPolicy = props?.spec?.imagePullPolicy;
        this.pullPolicy = props?.spec?.pullPolicy || 'Always';
        this.metrics = props?.spec?.metrics || false;
        this.metricsPort = props?.spec?.metricsPort || 9000;
        this.ipcConfig = props?.spec?.ipcConfig || '';
        this.moduleName = props?.spec?.moduleName || '';
        this.persistentVolumeClaim = props?.spec?.persistentVolumeClaim;
        this.volumeMountPath = props?.spec?.volumeMountPath || '/data';
        this.moduleConfig = props?.spec?.moduleConfig;
        this.mountOperatorApiToken = props?.spec?.mountOperatorApiToken || false;
        this.enabled =
            props?.spec?.enabled !== undefined ? props?.spec?.enabled : true;
        this.envSecret = props?.spec?.envSecret;
        this.livenessProbe = props?.spec?.livenessProbe;
        this.readinessProbe = props?.spec?.readinessProbe;
        this.startupProbe = props?.spec?.startupProbe;
        this.backupSchedule = props?.spec?.backupSchedule;
        this.bootstrapFromBackup = props?.spec?.bootstrapFromBackup;
        this.resources = props?.spec?.resources;
    }
    /**
     * Renders the object to Kubernetes JSON.
     */
    toJson() {
        const resolved = super.toJson();
        return {
            ...BotModule.GVK,
            ...toJson_BotModuleProps(resolved),
        };
    }
}
export function toJson_BotModuleProps(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        metadata: obj.metadata,
        spec: toJson_BotModuleSpec(obj.spec),
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_BotModuleSpec(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        size: obj.size,
        image: obj.image,
        imagePullPolicy: obj.imagePullPolicy,
        pullPolicy: obj.pullPolicy,
        metrics: obj.metrics,
        metricsPort: obj.metricsPort,
        ipcConfig: obj.ipcConfig,
        moduleName: obj.moduleName,
        persistentVolumeClaim: obj.persistentVolumeClaim,
        volumeMountPath: obj.volumeMountPath,
        moduleConfig: obj.moduleConfig,
        mountOperatorApiToken: obj.mountOperatorApiToken,
        enabled: obj.enabled,
        envSecret: obj.envSecret,
        livenessProbe: obj.livenessProbe,
        readinessProbe: obj.readinessProbe,
        startupProbe: obj.startupProbe,
        backupSchedule: toJson_BackupScheduleReference(obj.backupSchedule),
        bootstrapFromBackup: toJson_BootstrapFromBackup(obj.bootstrapFromBackup),
        resources: obj.resources,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_BackupScheduleReference(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        name: obj.name,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_BootstrapFromBackup(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        s3Store: toJson_S3StoreReference(obj.s3Store),
        image: obj.image,
        imagePullPolicy: obj.imagePullPolicy,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export function toJson_BotModuleStatus(obj) {
    if (obj === undefined) {
        return undefined;
    }
    const result = {
        conditions: obj.conditions,
    };
    // filter undefined values
    return Object.entries(result).reduce((r, i) => (i[1] === undefined ? r : { ...r, [i[0]]: i[1] }), {});
}
export const details = {
    name: 'BotModule',
    plural: 'botmodules',
    group: 'eevee.bot',
    version: 'v1',
    scope: 'Namespaced',
    shortName: 'botmodule',
};
