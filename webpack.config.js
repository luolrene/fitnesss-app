/**
 * webpack 打包配置文件
 */
// 导入node.js 内置模块
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    //入口 ===程序主模块
    entry: {
        // 公共模块
        commonCSS: './src/03-js/common.js',
        dom: './src/03-js/dom.js',
        http: './src/03-js/http.js',
        utils: './src/03-js/utils.js',
        // 三方插件模块
        captcha: './src/lib/captcha/captcha-mini.js',
        Swiper:'./src/lib/swiper/swiper-bundle.js',
        weui:'./src/lib/weui/weui.js',


        // 私有模块
        login: './src/03-js/login.js',
        home: './src/03-js/home.js',
        register: './src/03-js/register.js',
        publicity: './src/03-js/publicity.js',
        course:'./src/03-js/course.js',
        my:'./src/03-js/my.js',
        edit:'./src/03-js/edit.js',
    }, //相对路径
    //出口 ===最终生成的文件生成放的位置
    output: {
        path: path.resolve(__dirname, "dist"),   //绝对路径
        filename: 'js/[name].js',
        publicPath: './'  //打包完成之后的html文件引入其他资源的基础路径（相对路径）
    },
    //loader ===解释器
    module: {
        rules: [
            {
                test: /\.css$/,    //正则表达式  匹配需要应用这个规则的所有文件是哪些
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'postcss-loader']   //使用哪些三方包去处理匹配出来的这些文件 
                //css-loader:将css文件能够让webpack识别
                //style-loader: 将js中的css代码提取到页面上 写到style标签里面
            },
            {
                test: /\.less$/,    //正则表达式  匹配需要应用这个规则的所有文件是哪些
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'postcss-loader', 'less-loader']   //使用哪些三方包去处理匹配出来的这些文件 
                //css-loader:将css文件能够让webpack识别
                //style-loader: 将js中的css代码提取到页面上 写到style标签里面
            },
            {
                test: /\.(png|jpg|gif)$/, //配置css中的图片打包
                loader: 'url-loader',     //只有一个处理的loader的写法  
                //可以通过url-loader 将图片压缩为 base64编码格式的图片
                //大图就不压缩  小图可以压缩
                options: {
                    name: '[hash:16].[ext]',  // 图片输出的名字hash长度16位 默认32位
                    limit: 30 * 1024,  // 限制 小于30kb base64处理
                    esModule: false,  //默认css中的图片以ES6的模块进行打包，但是html中图片只能以node下的commonjs规范进行打包
                    outputPath: 'img'
                }
            },
            {
                test: /\.html$/,    //配置html文件打包
                loader: 'html-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,  // 处理字体格式文件
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',    // loader 编译es6为es5
                exclude: /node_modules/  // 排除
            }
        ]
    },
    //plugin 插件
    plugins: [
        // new 插件名({
        //     配置  key:value
        // })
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/01-page/login.html',
            filename: 'login.html',
            chunks: ['login', 'commonCSS', 'dom','http','utils']
            //以哪个html文件作为打包的模板
        }),
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/01-page/home.html',
            filename: 'home.html',
            chunks: ['home', 'commonCSS', 'dom','Swiper','http','utils']
            //以哪个html文件作为打包的模板
        }),
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/01-page/register.html',
            filename: 'register.html',
            chunks: ['register', 'commonCSS', 'dom','captcha','http','utils']
            //以哪个html文件作为打包的模板
        }),
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/01-page/course.html',
            filename: 'course.html',
            chunks: ['course', 'commonCSS', 'dom','utils']
            //以哪个html文件作为打包的模板
        }),
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/01-page/my.html',
            filename: 'my.html',
            chunks: ['my', 'commonCSS', 'dom','utils','http']
            //以哪个html文件作为打包的模板
        }),
        new HtmlWebpackPlugin({   //配置html打包的插件
            template: './src/01-page/edit.html',
            filename: 'edit.html',
            chunks: ['edit', 'commonCSS', 'dom','http','weui']
            //以哪个html文件作为打包的模板
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin()
    ],
    //mode 环境   development:开发环境  production：生产环境（线上环境）
    // mode: 'development',
    //修改webpack.config.js 中的mode 获取当前环境的变量
    mode: process.env.NODE_ENV,
    //webpack.config.js   
    // 开发服务器 配置【】
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 8081,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'edit.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器

}
 