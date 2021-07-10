module.exports = {
  generateEtags: true,
  webpack: ({entry: originalEntries, plugins, ...restConfig}, {webpack}) => ({
    ...restConfig,
    entry: async () => {
      const entries = await originalEntries()

      if (entries['main.js'] && !entries['main.js'].includes('./src/utils/polyfills.js')) {
        entries['main.js'].unshift('./src/utils/polyfills.js')
      }

      return entries
    },
    plugins: [...plugins, new webpack.IgnorePlugin(/\/__tests__\//)]
  })
}
