module.exports = {
  // ...
  webpackFinal: async (config) => {
    let ForkTsCheckerWebpackPluginIdx;
    config.plugins.forEach((plugin, idx) => {
      if ('ForkTsCheckerWebpackPlugin' === plugin.constructor.name) {
        ForkTsCheckerWebpackPluginIdx = idx;
      }
    });
    if (
      config.mode === 'production' &&
      ForkTsCheckerWebpackPluginIdx !== undefined
    ) {
      config.plugins.splice(ForkTsCheckerWebpackPluginIdx, 1);
    }

    return config;
  },
};