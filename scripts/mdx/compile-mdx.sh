#!/bin/bash
echo API_URL="$API_URL"
echo API_KEY="$API_KEY"
SCRIPT_DIR=$(dirname "$0")
ROOT_DIR=$(pwd)
pushd "$SCRIPT_DIR" >/dev/null 2>&1
node -r esbuild-runner/register compile-mdx.ts --root "$ROOT_DIR" --json --file $*
popd >/dev/null 2>&1