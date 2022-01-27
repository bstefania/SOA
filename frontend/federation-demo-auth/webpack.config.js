const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

module.exports = {
  mode: 'development',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 4003
  },
  output: {
    publicPath: 'http://localhost:4003/'
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
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'federation_demo_auth',
      library: { type: 'var', name: 'federation_demo_auth' },
      filename: 'remoteEntry.js',
      remotes: {
        federation_demo_container: 'federation_demo_container'
      },
      exposes: {
        './routes': './src/routes',
        './AuthService': './src/services/AuthService',
        './AuthHeader': './src/services/AuthHeader'
      },
      shared: {
        'react': {singleton: true},
        'react-dom': {singleton: true}
      }
    }),
    htmlPlugin
  ]
};
