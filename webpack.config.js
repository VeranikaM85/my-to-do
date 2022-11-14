const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
      open: true,
      hot: false,
      port: 8080,
    },
  };

module.exports = ({ development }) => ({
        mode: development ? 'development' : 'production',
        devtool: development ? 'inline-source-map' : false,
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/img/[hash][ext]'
                    }
                  },
                  {
                    test: /\.(woff(2)?|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[hash][ext]'
                    }
                  },
                  {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                  },
                  {
                    test: /\.s[ac]ss$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                  }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({ 
                filename: '[name].[contenthash].css'}),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new CleanWebpackPlugin(),
        ],
    ...devServer(development)
  });