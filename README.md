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

The operator reads `botmodule` and `ipcconfig` resources and creates the underlying Kubernetes workloads. Without these CRDs installed, the operator has nothing to watch.

## Features

- **`botmodule` CRD** — Declare a bot module (echo, dice, weather, etc.) with its container image, replica count, IPC config, persistent storage, and environment secrets.
- **`ipcconfig` CRD** — Declare inter-process communication settings, currently centred on NATS messaging (managed deployment, token auth).
- **TypeScript types & cdk8s constructs** — Import typed specs, status interfaces, and `ApiObject` subclasses for programmatic resource creation.
- **Docker image** — One-command CRD installation via `kubectl apply` inside a minimal Alpine container.
- **Status subresources** — Both CRDs expose a `status` subresource so the operator can report observed state and conditions.

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

## Usage / Commands

### TypeScript SDK

```typescript
import { eevee } from '@eeveebot/crds';

// Access typed interfaces
import type { botmoduleSpec, ipcconfigSpec } from '@eeveebot/crds';

// Use cdk8s constructs
import { botmodule, ipcconfig } from '@eeveebot/crds';
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

app.synth();
```

### CRD installation via kubectl

Apply the CRDs directly from this repo:

```bash
kubectl apply -f crds/botmodule.yaml
kubectl apply -f crds/ipcconfig.yaml
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
│   └── ipcconfig.yaml
├── src/
│   ├── index.mts           # Re-exports the full API
│   └── api/
│       └── v1/
│           ├── index.mts       # Barrel export for v1 types
│           ├── enums/
│           │   └── index.mts   # StatusReasons enum
│           ├── botModule_types.ts   # botmodule spec, status, cdk8s class
│           └── ipcConfig_types.ts   # ipcconfig spec, status, cdk8s class
├── Dockerfile              # Alpine + kubectl, runs entrypoint.sh
├── entrypoint.sh           # Applies every CRD YAML in /crds
└── docker-bake.hcl         # Build config (linux/amd64)
```

**Key design decisions:**

- CRD YAML files are **generated** from the TypeScript source via `pepr crd generate` (run as part of `npm run build`). The TypeScript types are the source of truth; the YAML is derived.
- Both CRDs are **namespaced** — resources live within a Kubernetes namespace, matching typical multi-tenant bot deployments.
- The `status` subresource is enabled on both CRDs, allowing the operator to write observed state without interfering with spec-driven reconciliation.

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
