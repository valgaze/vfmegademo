module.exports = {
    devServer: {
        proxy: {
            "/api_block": {
              target:"http://localhost:8000",
              logLevel: "debug",
              changeOrigin: true,
              pathRewrite: {
                '^/api_block': '/api_block', // rewrite path
              }            
            }
          }
      }
  }
  