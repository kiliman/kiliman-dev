#!/bin/bash
node -r esbuild-runner/register scripts/mdx/compile-mdx.ts --json --file "$1"