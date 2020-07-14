/*
 * @Author: your name
 * @Date: 2020-07-09 10:15:05
 * @LastEditTime: 2020-07-11 15:31:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \workspace\webpack_test\webpack.config.js
 */ 
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const  webpack = require('webpack')
const  { CleanWebpackPlugin } = require('clean-webpack-plugin')
const  CopyWebpackPlugin = require('copy-webpack-plugin');
const  MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const config = {
    // mode:"production",
    mode:"development",
    entry:'./src/main.js',
    output: {
        filename:"bundle.js",
        path:path.join(__dirname,'./dist')
    },
    devServer:{
        contentBase:'./dist',
        open:true,
        port:8080,
        hot:true,//开启热模块更新 HMR
        hotOnly:true
    },
    module: {
        rules:[
            {
                test: /\.(sass|scss|css)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
            },{
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins:[
        		//html打包
		new HtmlWebpackPlugin({
			template:'./src/index.html'
        }),
        //热模块更新插件
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({ 
            patterns :[
                {
                    from: path.join(__dirname,'src/assets'),
                    to: 'assets'
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    optimization:{
        minimizer:[
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ] ,
    }
}
module.exports = config
