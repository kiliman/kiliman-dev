#!/bin/bash
pwd
node -r esbuild-runner/register compile-mdx.ts --json --file $*