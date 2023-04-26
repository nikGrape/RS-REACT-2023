/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonConfig = (isBrowser, outputName) => ({
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputName,
    chunkFilename: outputName,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new webpack.DefinePlugin({
      __isBrowser__: isBrowser,
    }),
  ],
});

const browserConfig = {
  ...commonConfig('true', 'bundle.js'),
  entry: path.resolve(__dirname, 'src', 'main.tsx'),
};

const serverConfig = {
  ...commonConfig('false', 'server.js'),
  entry: path.resolve(__dirname, 'src', 'server', 'server.tsx'),
  target: 'node',
  externals: {
    ...nodeExternals(),
    express: 'commonjs express',
    react: 'commonjs react',
    'react-dom/server': 'commonjs react-dom/server',
    'react-router': 'commonjs react-router',
    'react-router-dom': 'commonjs react-router-dom',
  },
};

module.exports = [browserConfig, serverConfig];
