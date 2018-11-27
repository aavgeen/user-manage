const path = require('path')

const webpack = require('webpack')

const CURRENT_WORKING_DIR = process.cwd()

const config = {
    name: "browser",
    mode: "development",        // Also, mentioned where the commond is to be used.
    // The default value is production.
    devtool: 'eval-source-map',
    entry: [                    // Use these plugins and take input from the file mentioned.
        // Passing an array of file paths to the entry property creates what is known as a "multi-main entry". This is useful 
        // when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, 'client/main.js')
    ],
    output: {                   // Throw the compiled or converted code into the directory mentioned.
        path: path.join(CURRENT_WORKING_DIR , '/dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {               // Use these loaders or plugins to process
        // Out of the box, webpack only understands JavaScript files. Loaders allow webpack to
        // process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
        ]
    },  plugins: [      // Use these plugins
        // Plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NoEmitOnErrorsPlugin()
      ]
}

module.exports = config
