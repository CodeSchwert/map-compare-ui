const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/client/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({ path: '.env' }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js"
    }),
    new webpack.NamedModulesPlugin(),
    new uglify({
      // sourceMap: true,
      uglifyOptions: {
        // beautify: true,
        compress: {
          dead_code: true,
          drop_debugger: true,
          conditionals: true,
          comparisons: true,
          booleans: true,
          unused: true,
          toplevel: true,
          if_return: true,
          join_vars: true,
          // cascade: true,
          collapse_vars: true,
          reduce_vars: true,
          warnings: false,
          drop_console: true,
          passes: 2
        },
        mangle: true
      }
    }),
    new CopyWebpackPlugin([
      'src/static/index.html',
      'src/static/favicon.ico'
    ])
  ]
};
