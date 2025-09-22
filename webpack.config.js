module.exports = (config) => {
  // Reuse Angular's existing DefinePlugin instance to inject our envs
  if (Array.isArray(config.plugins)) {
    const definePlugin = config.plugins.find(
      (p) => p && p.constructor && p.constructor.name === 'DefinePlugin'
    );
    if (definePlugin && definePlugin.definitions) {
      const env = {
        TEVET_API: process.env.TEVET_API || '',
        TEVET_API_AUTH_CLIENT: process.env.TEVET_API_AUTH_CLIENT || '',
        TEVET_API_AUTH: process.env.TEVET_API_AUTH || '',
      };
      // Support both dot and bracket notation by defining the full env object
      definePlugin.definitions['process.env'] = JSON.stringify(env);
      // Also define `process` to ensure runtime access in both dot and bracket notation
      definePlugin.definitions['process'] = JSON.stringify({ env });
      // Still define direct keys for good measure
      definePlugin.definitions['process.env.TEVET_API'] = JSON.stringify(env.TEVET_API);
      definePlugin.definitions['process.env.TEVET_API_AUTH_CLIENT'] = JSON.stringify(env.TEVET_API_AUTH_CLIENT);
      definePlugin.definitions['process.env.TEVET_API_AUTH'] = JSON.stringify(env.TEVET_API_AUTH);
    }
  }
  return config;
};
