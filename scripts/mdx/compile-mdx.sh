#!/bin/bash
node -r esbuild-runner/register compile-mdx.ts --json --file $*