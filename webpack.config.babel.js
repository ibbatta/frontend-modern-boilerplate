import { resolve, join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WorkboxPlugin from 'workbox-webpack-plugin';
import { HotModuleReplacementPlugin, WatchIgnorePlugin } from 'webpack';

const isProd = process.env.NODE_ENV === 'production';
const distOutput = resolve(__dirname, 'dist');

const webpackConfig = {
  target: 'web',
  devtool: isProd ? 'none' : 'eval',
  mode: isProd ? 'production' : 'development',
  entry: {
    main: [resolve(__dirname, 'app/index.jsx' || 'app/index.js')]
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
    host: process.env.HOST || 'localhost',
    contentBase: resolve(__dirname, 'app'),
    compress: true,
    hot: true,
    inline: true,
    open: true,
    progress: true,
    overlay: !isProd,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 500,
      poll: true
    }
  },
  performance: {
    hints: isProd ? 'error' : 'warning'
  },
  optimization: {
    minimize: isProd,
    minimizer: [new UglifyJsPlugin()],
    nodeEnv: isProd ? 'production' : 'development',
    noEmitOnErrors: false,
    namedModules: !isProd,
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
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
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: isProd,
          warnings: !isProd
        }
      }
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
      globPatterns: ['**/*.{html,js,css,jpg,jpeg,svg,png,ico,woff,woff2,ttf}'],
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|tiff|ico|json|woff|woff2|ttf)$/,
          handler: 'cacheFirst',
          options: { cacheName: 'static-assets' }
        },
        {
          urlPattern: new RegExp('^https://fonts.googleapis.com/'),
          handler: 'networkFirst',
          options: { cacheName: 'google-font' }
        },
        {
          urlPattern: new RegExp('/'),
          handler: 'staleWhileRevalidate',
          options: { cacheName: 'general' }
        }
      ]
    })
  );
}

module.exports = webpackConfig;
