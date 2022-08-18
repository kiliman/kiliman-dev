module.exports = {
  type: 'transform', // bundle or transform (see description above)
  esbuild: {
    // Any esbuild build or transform options go here
    target: 'node16',
    format: 'cjs',
  },
}
