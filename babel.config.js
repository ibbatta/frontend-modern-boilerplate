module.exports = api => {
  api.cache(true);
  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-syntax-dynamic-import'
  ];

  return {
    presets,
    plugins
  };
};
