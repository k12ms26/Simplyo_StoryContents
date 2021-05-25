module.exports = {
    devServer: {
        // proxy: {
        //     '/posts': {
        //         target: 'http://localshot:8080',
        //         // changeOrigin: true,
        //         pathRewrite: {
        //             '^/posts': '',
        //         },
        //     },
        // },
        proxy: {
            '/v1': {
                target: 'https://hub.simplyo.com',
                changeOrigin: true,
                headers: {
                    Origin: 'http://14.63.67.157',
                },
            },
        },
    },
    runtimeCompiler: true,
};