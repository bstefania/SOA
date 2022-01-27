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
    port: 4001
  },
  output: {
    publicPath: 'http://localhost:4001/'
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
          loader: 'file-loader',
        },
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'federation_demo_recipes',
      library: { type: 'var', name: 'federation_demo_recipes' },
      filename: 'remoteEntry.js',
      remotes: {
        federation_demo_container: 'federation_demo_container',
        federation_demo_auth: 'federation_demo_auth'
      },
      exposes: {
        './routes': './src/routes',
      },
      shared: {
        'react': {
          singleton: true,
          requiredVersion: "17.0.2",
        },
        'react-dom': {
          singleton: true,
          requiredVersion: "17.0.2",
        }
      }
    }),
    htmlPlugin
  ]
};
