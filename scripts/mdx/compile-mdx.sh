#!/bin/bash
SCRIPT_DIR=$(dirname "$0")
node -r esbuild-runner/register "$SCRIPT_DIR/compile-mdx.ts" --json --file $*