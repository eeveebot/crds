#!/usr/bin/env bash

set -exu

# Apply CRDs
find /crds -type f -name '*.yaml' -exec kubectl apply -f {} \;
