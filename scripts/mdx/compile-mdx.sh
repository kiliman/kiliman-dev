#!/bin/bash
node -r esbuild-runner/register compile-mdx.ts --root ../.. --json --file $*