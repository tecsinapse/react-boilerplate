module.exports = function presets(api) {
  api.cache(true);
  const envConfig = { modules: false };
  const plugins = ['macros', '@babel/plugin-syntax-dynamic-import'];

  return {
    presets: ['@babel/preset-react', ['@babel/preset-env', envConfig]],
    plugins,
  };
};
