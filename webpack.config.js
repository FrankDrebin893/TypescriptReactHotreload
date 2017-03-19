var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
    entry: [
        APP_DIR + '/index.tsx'
    ],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: "source-map",
    module: {
        loaders: [{
            test: /\.jsx?/,
            include: APP_DIR,
            exclude: './node_modules',
            loader: "babel"
        }, {
            test: /\.tsx?$/,
            loader: 'babel!ts-loader'
        }],
        preLoaders: [ // All output '.js' files will have any sourcemaps re-processed by
            // 'source-map-loader'.
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    resolve: {
        extensions: [
            '',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

    ],
    cache: true,
    debug: true
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    )
}
else {
    config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    //config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());
}



module.exports = config;