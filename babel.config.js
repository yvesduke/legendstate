module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@tamagui/babel-plugin',
      {
        exclude: /node_modules/,
        config: './tamagui.config.ts',
        components: ['tamagui'],
      },
    ],
  ],
};
