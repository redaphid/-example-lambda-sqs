const path = require('path');

const serverConfig = {
    module: {
        rules: [
            {
                test: /\.coffee$/, use: ['coffee-loader']
            },
        ]
    },
    resolve: {
        modules: ['node_modules']
        // aliasFields: ["module"],        
        // // alias: {
        // //     './helpers': path.resolve(__dirname, '')
        // // }
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.node.js'
    }
};

module.exports = serverConfig   