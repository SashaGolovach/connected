const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/**
 * @param { 'development' | 'production' } mode
 */
const getConfig = mode => ({
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      name: true,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: [/node_modules/, /dist/, /lib/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-syntax-dynamic-import'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // options: {
            //   sourceMap: mode === 'development',
            // },
          },
        ],
      },
      {
        test: /\.module.scss$/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
              camelCase: true,
              namedExport: true,
              watch: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module.scss$/,
        loader: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // options: {
            //   sourceMap: mode === 'development',
            // },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-react-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  mode,
  entry: {
    app: ['core-js/stable', 'regenerator-runtime/runtime', `./src/index.tsx`],
  },
  output: {
    globalObject: 'self',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Connected',
      template: path.join(__dirname, 'src/index.html'),
    }),
    new CopyWebpackPlugin([
      // Copy directory contents to {output}/to/directory/
      //{ from: 'from/directory', to: 'to/directory' },
      {
        from: path.join(__dirname, 'node_modules/monaco-editor'),
        to: path.join(__dirname, 'dist/monaco-editor'),
      },
    ]),
  ],
  devServer: {
    compress: true,
    port: 8080,
    historyApiFallback: true,
    contentBase: [path.resolve(__dirname), path.resolve(__dirname, 'dist')],
  },
});

module.exports = getConfig;
