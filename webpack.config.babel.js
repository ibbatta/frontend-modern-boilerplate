import { resolve, join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import { HotModuleReplacementPlugin, WatchIgnorePlugin } from 'webpack';

const isProd = process.env.NODE_ENV === 'production';
const distOutput = resolve(__dirname, 'dist');
const logStats = {
  context: resolve(__dirname, 'app'),
  colors: true,
  env: true,
  all: false,
  assets: true,
  modules: true,
  maxModules: isProd ? 5 : 0,
  errors: true,
  errorDetails: true,
  warnings: true,
  moduleTrace: true
};

const webpackConfig = {
  target: 'web',
  devtool: isProd ? 'none' : 'eval',
  mode: isProd ? 'production' : 'development',
  entry: {
    main: [resolve(__dirname, 'app/index.jsx')]
  },
  output: {
    path: distOutput,
    filename: isProd ? '[name]-[chunkhash].js' : '[name].bundle.js',
    chunkFilename: isProd ? '[name]-[chunkhash].js' : '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(html|xhtml)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: isProd }
          }
        ]
      },
      {
        test: /\.(hbs|handlebars)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'handlebars-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico|tiff)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3000
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: ['./node_modules', './app'],
    extensions: ['.hbs', '.js', '.jsx', '.css', '.scss', '.json'],
    alias: {
      Components: resolve(__dirname, './app/06.components'),
      app: resolve(__dirname, './app')
    }
  },
  devServer: {
    port: process.env.PORT || 9000,
    host: process.env.HOST || '127.0.0.1',
    contentBase: resolve(__dirname, 'app'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    inline: true,
    open: !isProd,
    overlay: !isProd,
    noInfo: isProd,
    quiet: isProd,
    stats: logStats,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 500,
      poll: true
    }
  },
  stats: logStats,
  performance: {
    hints: isProd ? 'error' : 'warning'
  },
  optimization: {
    runtimeChunk: 'single',
    namedChunks: true,
    usedExports: true,
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          mangle: true,
          output: {
            comments: false
          }
        }
      })
    ],
    nodeEnv: isProd ? 'production' : 'development',
    noEmitOnErrors: false,
    namedModules: !isProd,
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
      minSize: 0,
      name: true,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new WebpackMd5Hash(),
    new CleanWebpackPlugin(distOutput, {}),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name]-[contenthash].css' : '[name].bundle.css'
    }),
    new HtmlWebpackPlugin({
      template: join(__dirname, 'app/index.hbs'),
      filename: 'index.html',
      data: {
        title: 'React Webpack Boilerplate',
        isProd: isProd,
        noscript: 'Your browser does not support JavaScript!'
      },
      inject: true,
      minify: isProd,
      cache: isProd,
      hash: isProd
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};

if (!isProd) {
  webpackConfig.plugins.push(
    new WatchIgnorePlugin([resolve(__dirname, 'node_modules')]),
    new HotModuleReplacementPlugin()
  );
}

if (isProd) {
  webpackConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: 'assets/**',
        context: 'app'
      }
    ]),
    new WorkboxPlugin.GenerateSW({
      cacheId: 'boilerplate-app',
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|tiff|ico|json|woff|woff2|ttf)$/,
          handler: 'CacheFirst',
          options: { cacheName: 'static-assets' }
        },
        {
          urlPattern: new RegExp('^https://fonts.googleapis.com/'),
          handler: 'NetworkFirst',
          options: { cacheName: 'google-font' }
        },
        {
          urlPattern: new RegExp('/'),
          handler: 'StaleWhileRevalidate',
          options: { cacheName: 'general' }
        }
      ]
    })
  );
}

module.exports = webpackConfig;
