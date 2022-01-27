const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    hot: true,
    static: path.join(__dirname, 'dist'),
    port: 4000
  },
  output: {
    publicPath: 'http://localhost:4000/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'federation_demo_container',
      library: { type: 'var', name: 'federation_demo_container' },
      filename: 'remoteEntry.js',
      remotes: {
        federation_demo_recipes: 'federation_demo_recipes',
        federation_demo_about: 'federation_demo_about',
        federation_demo_auth: 'federation_demo_auth'
      },
      exposes: {
        './Home': './src/Home'
      },
      shared: {
        'react': {
          requiredVersion: "17.0.2",
          singleton: true},
        'react-dom': {singleton: true},
        'styled-components': {singleton: true},
        '@material-ui': {singleton: true},
        'react-bootstrap': {singleton: true}
      }
    }),
    htmlPlugin
  ]
};
