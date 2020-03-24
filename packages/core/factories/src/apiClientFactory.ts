
export function apiClientFactory<API_CLIENT_METHODS, API_CLIENT_SETTINGS>(factoryParams: { defaultSettings; onSetup }) {
  factoryParams.defaultSettings.overrides = {};
  return {
    override (overrides: API_CLIENT_METHODS) {
      factoryParams.defaultSettings.overrides = { ...factoryParams.defaultSettings.overrides, ...overrides };
    },
    setup (config: API_CLIENT_SETTINGS) {
      factoryParams.defaultSettings = { ...factoryParams.defaultSettings, ...config };
      factoryParams.onSetup(factoryParams.defaultSettings);
    },
    settings: factoryParams.defaultSettings
  };
}

