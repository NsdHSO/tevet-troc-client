const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();
const myOrgEnvRegex = /^TEVET/i;

function getClientEnvironment() {
  const envVars = {};
  console.log(process.env);
  for (const key in process.env) {
    if (myOrgEnvRegex.test(key)) {
      envVars[key] = process.env[key];
    }
  }
  console.log(envVars);
  return {
    'process.env': JSON.stringify(envVars),
  };
}

module.exports = (config, options, context) => {
  // Overwrite the mode set by Angular if the NODE_ENV is set
  config.mode = process.env.NODE_ENV || config.mode;
  config.plugins.push(new webpack.DefinePlugin(getClientEnvironment()));

  // Add fallback for Node.js core modules
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve?.fallback,
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      assert: require.resolve('assert/'),
      fs: false, // No browser polyfill available, use false
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      vm: require.resolve('vm-browserify'),
      constants: require.resolve('constants-browserify'),
      querystring: require.resolve('querystring-es3'),
    },
  };

  // Add Buffer polyfill
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  );

  // Add process polyfill if needed
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    })
  );

  return config;
};
