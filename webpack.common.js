const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { default: ImageminWebpackPlugin } = require('imagemin-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Menggantikan 'style-loader'
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith(
            'https://unofficial-masakapahariini-api-olive.vercel.app/',
            ),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'resep-api',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith(
            'https://rasa-in-backend.vercel.app/',
            ),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'artikel-api',
          },
        },
      ],
    }),
    new ImageminWebpackPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '65-90',
      },
      gifsicle: {
        interlaced: false,
      },
      jpegtran: {
        progressive: true,
      },
      svgo: {
        plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
      },
    }),
    new MiniCssExtractPlugin({
      // Tambahkan plugin MiniCssExtractPlugin
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new BundleAnalyzerPlugin(),
  ],
};
