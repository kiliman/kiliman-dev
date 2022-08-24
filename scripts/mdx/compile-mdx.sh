#!/bin/bash
SCRIPT_DIR=$(dirname "$0")
ROOT_DIR=$(pwd)
pushd "$SCRIPT_DIR" >/dev/null 2>&1
node -r esbuild-runner/register compile-mdx.ts --api https://kiliman.dev/api --key 6d92a1f4-a34a-43c8-9a61-138431f67af4 --root "$ROOT_DIR" --json --file $*
popd >/dev/null 2>&1