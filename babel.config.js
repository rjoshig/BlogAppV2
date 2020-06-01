module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo', 'module:react-native-dotenv'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@configs': './src/configs',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@navigations': './src/navigations',
            '@stores': './src/stores',
            '@utilities': './src/utilities',
            '@services': './src/services',
            '@screens': './src/screens',
          },
        },
      ],
    ],
  }
}
