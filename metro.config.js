const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const denizenUiLibrary = path.resolve(__dirname, '../denizen-app/src/ui-library');
const shimsDir = path.resolve(__dirname, 'denizen-shims');

config.watchFolders = [denizenUiLibrary];

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
  // Ensure denizen-app files resolve packages from the playground's node_modules
  nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
  resolveRequest: (context, moduleName, platform) => {
    // Map denizen-app internal dependencies to local shims
    const shimMap = {
      '@env': path.resolve(shimsDir, 'env.ts'),
      '@utils/tenant': path.resolve(shimsDir, 'tenant.ts'),
      'react-native-vector-icons': path.resolve(shimsDir, 'react-native-vector-icons.ts'),
      'react-native-linear-gradient': path.resolve(shimsDir, 'linear-gradient.ts'),
    };

    if (shimMap[moduleName]) {
      return {
        filePath: shimMap[moduleName],
        type: 'sourceFile',
      };
    }

    // Map @ui-library/* to the real denizen-app source
    if (moduleName.startsWith('@ui-library/')) {
      const subPath = moduleName.replace('@ui-library/', '');
      return context.resolveRequest(context, path.resolve(denizenUiLibrary, subPath), platform);
    }

    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = config;
