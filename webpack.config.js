const path = require('path');

const serverConfig = {
    module: {
        rules: [
            {
                test: /\.coffee$/, use: ['coffee-loader']
            },
        ]
    },
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main'
    }
};

module.exports = serverConfig   