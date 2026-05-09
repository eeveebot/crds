# crds

> Kubernetes CustomResourceDefinitions for the eevee ecosystem.

## Overview

The `crds` module defines and distributes the Kubernetes CustomResourceDefinitions (CRDs) that the [eevee operator](https://github.com/eeveebot/operator) watches and reconciles. Every eevee bot deployment relies on these CRDs to declare its desired state — which modules to run, how they intercommunicate, and what infrastructure the operator should provision.

This package serves two purposes:

1. **Runtime CRD installation** — A lightweight Docker image that runs `kubectl apply` against every CRD YAML, making it easy to bootstrap a cluster with `kubectl apply -k` or a GitOps pipeline.
2. **TypeScript SDK** — Published as `@eeveebot/crds` on the GitHub npm registry, it exports typed interfaces and cdk8s construct classes so other eevee modules (the operator, Helm charts, cdk8s apps) can programmatically create and manipulate these resources.

### How it fits in

```
┌─────────────┐    applies    ┌──────┐    watches    ┌───────────┐
│  crds (this) │ ──────────▶ │ k8s  │ ◀─────────── │  operator  │
└─────────────┘               └──────┘              └───────────┘
                                ▲                        │
                                │ reconciles             │
                                ▼                        ▼
                          Deployments, Services, NATS, PVCs …
```

The operator reads `botmodule`, `ipcconfig`, `s3store`, `backupschedule`, and `backuprestore` resources and creates the underlying Kubernetes workloads. Without these CRDs installed, the operator has nothing to watch.

## Features

- **`botmodule` CRD** — Declare a bot module (echo, dice, weather, etc.) with its container image, replica count, IPC config, persistent storage, environment secrets, and optional backup/restore configuration.
- **`ipcconfig` CRD** — Declare inter-process communication settings, currently centred on NATS messaging (managed deployment, token auth).
- **`s3store` CRD** — Declare an S3-compatible object storage connection (endpoint, bucket, credentials) for PVC backups and restores.
- **`backupschedule` CRD** — Schedule recurring PVC backups to an S3 store via a K8s CronJob.
- **`backuprestore` CRD** — Trigger a oneshot PVC restore from an S3 store via a K8s Job.
- **TypeScript types & cdk8s constructs** — Import typed specs, status interfaces, and `ApiObject` subclasses for programmatic resource creation.
- **Docker image** — One-command CRD installation via `kubectl apply` inside a minimal Alpine container.
- **Status subresources** — All CRDs expose a `status` subresource so the operator can report observed state and conditions.

## Install

### As a Docker image (CRD installation)

```bash
docker run --rm -v ~/.kube/config:/home/kubectl/.kube/config ghcr.io/eeveebot/crds:latest
```

The entrypoint finds every `*.yaml` in `/crds` and runs `kubectl apply -f` on each one.

### As an npm package (TypeScript SDK)

```bash
npm install @eeveebot/crds
```

> **Note:** This package is published to the GitHub npm registry. Configure your `.npmrc`:
>
> ```
> @eeveebot:registry=https://npm.pkg.github.com/
> ```

## CRD Reference

### botmodule

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `spec.size` | number | `1` | Number of module pod replicas |
| `spec.image` | string | `ghcr.io/eeveebot/echo:latest` | Container image to deploy |
| `spec.pullPolicy` | string | `"Always"` | Kubernetes image pull policy |
| `spec.metrics` | boolean | `false` | Enable Prometheus-style metrics endpoint |
| `spec.metricsPort` | number |  `9000` | Port for the metrics server |
| `spec.ipcConfig` | string | — | Name of an `ipcconfig` resource for IPC setup |
| `spec.moduleName` | string | — | Logical name of the module (e.g. `echo`, `dice`) |
| `spec.persistentVolumeClaim` | object | — | Full PVC spec (access modes, storage class, resources, selector, etc.) |
| `spec.volumeMountPath` | string | `"/data"` | Container path where the PVC is mounted |
| `spec.moduleConfig` | string | — | Arbitrary YAML config passed to the module as a multi-line string |
| `spec.mountOperatorApiToken` | boolean | `false` | Mount the operator API token into the pod |
| `spec.enabled` | boolean | `true` | Whether the module is active |
| `spec.envSecret` | object | — | Kubernetes Secret reference (`name` + `namespace`) injected as env vars |
| `spec.livenessProbe` | object | — | Custom liveness probe (standard Kubernetes `V1Probe`). Default: HTTP GET `/health` on `metricsPort` |
| `spec.readinessProbe` | object | — | Custom readiness probe (standard Kubernetes `V1Probe`). Default: HTTP GET `/health` on `metricsPort` |
| `spec.startupProbe` | object | — | Custom startup probe (standard Kubernetes `V1Probe`). Default: none |
| `spec.backupSchedule` | object | — | Reference to a `backupschedule` resource (`name`). When set, the operator wires up backup CronJobs for this module's PVC |
| `spec.bootstrapFromBackup` | object | — | Restore the latest backup from S3 before first deployment. Contains `s3Store` (name ref) and `image` (restore container) |

**Status fields** (`status` subresource):

| Field | Type | Description |
|-------|------|-------------|
| `conditions` | array | List of condition objects with `lastTransitionTime`, `message`, `reason`, and `observedGeneration` |

#### Example: botmodule resource

```yaml
apiVersion: eevee.bot/v1
kind: botmodule
metadata:
  name: echo
  namespace: eevee
spec:
  moduleName: echo
  image: ghcr.io/eeveebot/echo:latest
  size: 1
  enabled: true
  ipcConfig: default-ipc
  metrics: true
  metricsPort: 9000
  persistentVolumeClaim:
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 1Gi
  volumeMountPath: /data
  envSecret:
    name: echo-secrets
    namespace: eevee
  backupSchedule:
    name: echo-daily
  # bootstrapFromBackup:
  #   s3Store:
  #     name: my-minio
  #   image: ghcr.io/eevee/backup:latest
```

### ipcconfig

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `spec.nats.managed.enabled` | boolean | — | Let the operator deploy a NATS server automatically |
| `spec.nats.managed.image` | string | — | NATS container image (e.g. `nats:2-alpine`) |
| `spec.nats.token.generate` | boolean | — | Have the operator generate a NATS auth token |
| `spec.nats.token.secretKeyRef` | object | — | Reference to a Secret key holding the NATS token (`secret.name`, `secret.namespace`, `key`) |

**Status fields** (`status` subresource):

| Field | Type | Description |
|-------|------|-------------|
| `conditions` | array | Same shape as `botmodule` status conditions |

#### Example: ipcconfig resource

```yaml
apiVersion: eevee.bot/v1
kind: ipcconfig
metadata:
  name: default-ipc
  namespace: eevee
spec:
  nats:
    managed:
      enabled: true
      image: nats:2-alpine
    token:
      generate: true
      secretKeyRef:
        secret:
          name: nats-token
          namespace: eevee
        key: token
```

### s3store

Declares an S3-compatible object storage connection. Referenced by `backupschedule` and `backuprestore` resources to avoid duplicating connection config and credentials.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `spec.endpoint` | string | — | S3-compatible endpoint URL (e.g. `https://s3.amazonaws.com` or `https://minio.example.com`) |
| `spec.accessId` | object | — | Secret reference for the access key ID (`secretKeyRef.secret.name`, `secretKeyRef.secret.namespace`, `secretKeyRef.key`) |
| `spec.accessKey` | object | — | Secret reference for the secret access key (same shape as `accessId`) |
| `spec.bucket` | string | — | S3 bucket name |
| `spec.prefix` | string | — | Common file prefix within the bucket (e.g. `eevee/backups/`) |
| `spec.pathStyle` | boolean | `false` | Use path-style addressing (`host/bucket`) instead of virtual-hosted-style (`bucket.host`). Set to `true` for MinIO and similar stores |

**Status fields** (`status` subresource):

| Field | Type | Description |
|-------|------|-------------|
| `conditions` | array | Same shape as `botmodule` status conditions |
| `lastConnectionTest` | string | Timestamp of the last successful connection test to the S3 endpoint |

#### Example: s3store resource

```yaml
apiVersion: eevee.bot/v1
kind: s3store
metadata:
  name: my-minio
  namespace: eevee
spec:
  endpoint: https://minio.example.com
  accessId:
    secretKeyRef:
      secret:
        name: minio-creds
        namespace: eevee
      key: accessKeyId
  accessKey:
    secretKeyRef:
      secret:
        name: minio-creds
        namespace: eevee
      key: secretAccessKey
  bucket: eevee-backups
  prefix: prod/
  pathStyle: true
```

### backupschedule

Schedules recurring PVC backups to an S3 store. The operator creates and manages a K8s CronJob based on this resource.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `spec.schedule` | string | — | Crontab-style schedule expression (e.g. `0 2 * * *` for daily at 2am) |
| `spec.s3Store` | object | — | Reference to an `s3store` resource (`name`) in the same namespace |
| `spec.image` | string | — | Container image to use for the backup job (e.g. `ghcr.io/eevee/backup:latest`) |

**Status fields** (`status` subresource):

| Field | Type | Description |
|-------|------|-------------|
| `conditions` | array | Same shape as `botmodule` status conditions |
| `lastBackup` | string | Timestamp of the last successful backup |
| `cronJobName` | string | Name of the managed K8s CronJob |

#### Example: backupschedule resource

```yaml
apiVersion: eevee.bot/v1
kind: backupschedule
metadata:
  name: echo-daily
  namespace: eevee
spec:
  schedule: "0 2 * * *"
  s3Store:
    name: my-minio
  image: ghcr.io/eevee/backup:latest
```

### backuprestore

Triggers a oneshot PVC restore from an S3 store. The operator creates a K8s Job to download and extract the backup.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `spec.botModule` | object | — | Reference to the `botmodule` whose PVC will be restored (`name`) |
| `spec.s3Store` | object | — | Reference to the `s3store` CR containing the backup (`name`) |
| `spec.image` | string | — | Container image to use for the restore job |
| `spec.backupId` | string | — | UUID of the specific backup to restore. If omitted, restores the latest backup |

**Status fields** (`status` subresource):

| Field | Type | Description |
|-------|------|-------------|
| `conditions` | array | Same shape as `botmodule` status conditions |
| `jobName` | string | Name of the managed K8s Job |
| `restoredBackupId` | string | UUID of the backup that was restored |
| `phase` | string | Phase of the restore operation (`Pending`, `Running`, `Succeeded`, `Failed`) |

#### Example: backuprestore resource

```yaml
apiVersion: eevee.bot/v1
kind: backuprestore
metadata:
  name: echo-restore-latest
  namespace: eevee
spec:
  botModule:
    name: echo
  s3Store:
    name: my-minio
  image: ghcr.io/eevee/backup:latest
  # backupId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"  # omit for latest
```

### S3 key format

All backups follow a consistent path format:

``
<prefix>/<namespace>/<moduleName>/<uuid>.tar.gz
``

- **prefix** — from `s3store.spec.prefix`
- **namespace** — the bot instance identity (K8s namespace)
- **moduleName** — from `botmodule.spec.moduleName`
- **uuid** — generated by the backup image at write time

Example: `prod/eevee-bot/echo/a1b2c3d4-e5f6-7890-abcd-ef1234567890.tar.gz`

## Usage / Commands

### TypeScript SDK

```typescript
import { eevee } from '@eeveebot/crds';

// Access typed interfaces
import type { botmoduleSpec, ipcconfigSpec, s3storeSpec, backupscheduleSpec, backuprestoreSpec } from '@eeveebot/crds';

// Use cdk8s constructs
import { botmodule, ipcconfig, s3store, backupschedule, backuprestore } from '@eeveebot/crds';
import { App, Chart } from 'cdk8s';

const app = new App();
const chart = new Chart(app, 'eevee');

new botmodule(chart, 'echo-module', {
  spec: {
    moduleName: 'echo',
    image: 'ghcr.io/eeveebot/echo:latest',
    size: 1,
    enabled: true,
    ipcConfig: 'default-ipc',
  },
});

new ipcconfig(chart, 'default-ipc', {
  spec: {
    nats: {
      managed: { enabled: true },
      token: { generate: true },
    },
  },
});

new s3store(chart, 'my-minio', {
  spec: {
    endpoint: 'https://minio.example.com',
    accessId: {
      secretKeyRef: {
        secret: { name: 'minio-creds', namespace: 'eevee' },
        key: 'accessKeyId',
      },
    },
    accessKey: {
      secretKeyRef: {
        secret: { name: 'minio-creds', namespace: 'eevee' },
        key: 'secretAccessKey',
      },
    },
    bucket: 'eevee-backups',
    prefix: 'prod/',
    pathStyle: true,
  },
});

new backupschedule(chart, 'echo-daily', {
  spec: {
    schedule: '0 2 * * *',
    s3Store: { name: 'my-minio' },
    image: 'ghcr.io/eevee/backup:latest',
  },
});

app.synth();
```

### CRD installation via kubectl

Apply the CRDs directly from this repo:

```bash
kubectl apply -f crds/botmodule.yaml
kubectl apply -f crds/ipcconfig.yaml
kubectl apply -f crds/s3store.yaml
kubectl apply -f crds/backupschedule.yaml
kubectl apply -f crds/backuprestore.yaml
```

Or use the Docker image in a Kubernetes Job:

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: install-crds
  namespace: eevee
spec:
  template:
    spec:
      containers:
        - name: crds
          image: ghcr.io/eeveebot/crds:latest
      restartPolicy: Never
```

## Architecture

```
crds/
├── crds/                   # Raw CRD YAML files (applied to the cluster)
│   ├── botmodule.yaml
│   ├── ipcconfig.yaml
│   ├── s3store.yaml
│   ├── backupschedule.yaml
│   └── backuprestore.yaml
├── src/
│   ├── index.mts           # Re-exports the full API
│   └── api/
│       └── v1/
│           ├── index.mts           # Barrel export for v1 types
│           ├── enums/
│           │   └── index.mts       # StatusReasons enum
│           ├── botModule_types.ts   # botmodule spec, status, cdk8s class
│           ├── ipcConfig_types.ts   # ipcconfig spec, status, cdk8s class
│           ├── s3Store_types.ts     # s3store spec, status, cdk8s class
│           ├── backupSchedule_types.ts  # backupschedule spec, status, cdk8s class
│           └── backupRestore_types.ts   # backuprestore spec, status, cdk8s class
├── Dockerfile              # Alpine + kubectl, runs entrypoint.sh
├── entrypoint.sh           # Applies every CRD YAML in /crds
└── docker-bake.hcl         # Build config (linux/amd64)
```

**Key design decisions:**

- CRD YAML files are **generated** from the TypeScript source via `pepr crd generate` (run as part of `npm run build`). The TypeScript types are the source of truth; the YAML is derived.
- All CRDs are **namespaced** — resources live within a Kubernetes namespace, matching typical multi-tenant bot deployments.
- The `status` subresource is enabled on all CRDs, allowing the operator to write observed state without interfering with spec-driven reconciliation.

## Development

```bash
git clone https://github.com/eeveebot/crds.git
cd crds
npm install
npm run build   # compiles TypeScript + regenerates CRD YAMLs via pepr
```

### Build pipeline

1. `tsc` compiles `src/` → `dist/`
2. `pepr crd generate` reads the TypeScript type definitions and writes `crds/*.yaml`

To apply the generated CRDs to your current cluster:

```bash
kubectl apply -f crds/
```

## Contributing

See the [eevee eevee contributing guide](https://github.com/eeveebot/eevee) for conventions and PR workflow.

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) — see [LICENSE](./LICENSE) for the full text.
