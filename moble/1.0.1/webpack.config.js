var webpack = require("webpack");
var path = require("path");
var glob = require('glob');
var SRC_DIR = path.resolve(process.cwd(), '/public');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, './public/javascripts/es6js');
var sourceMap = require('source-map');

/**
 * 根据目录获取入口
 * @param  {[type]} globPath [description]
 * @return {[type]}          [description]
 */
function getEntry(globPath) {
    let entries = {};
    glob.sync(globPath).forEach(function(entry) {
        let basename = path.basename(entry, path.extname(entry)),
            pathname = path.dirname(entry);
        if (!entry.match(/js\/tools\//)) {
            // entries[pathname.split('/').splice(4).join('/') + '/' + basename] = pathname + '/' + basename;
            entries['home' + '/' + basename] = pathname + '/' + basename;
        }
    });
    return entries;
}

let entryJs = getEntry('./public/javascripts/js/*.js');


module.exports = {
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    // entry: entries(),
    entry: entryJs,
    output: {
        // path: path.join(__dirname, "dist"),
        path: BUILD_PATH,
        publicPath: BUILD_PATH,
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    module: {
        // loaders: [{
        //     test: require.resolve('zepto'),
        //     loader: 'exports-loader?window.Zepto!script-loader'
        // }],
        rules: [
            //     {
            //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            //     loader: 'url-loader?limit=100000'
            // }, 
            {
                test: /\.scss$/,
                loader: ["style-loader", "css-loader", "sass-loader", ]
            },
            // {
            //     test: require.resolve('zepto'),
            //     loader: ['expose-loader?$']
            // },
            {
                test: /\.js$/,
                loader: ["babel-loader?cacheDirectory"],
                // include: path.resolve(__dirname, './src/js/es6')
            },
            {
                test: /\.css$/,
                loader: ["style-loader", "css-loader"],
                include: path.resolve(__dirname, './src/es6/route')
            }
        ]
    },
    plugins: [
        /**
         * 抽出公共JS
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: 2,
        }),
        // /**
        //  * 压缩代码
        //  */
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     except: ['$super', '$', 'exports', 'require'] //排除关键字
        // }),
    ]
}