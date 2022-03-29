module.exports = {
    devServer: {
        proxy: {
            "/api_block": {
              target:"https://gwpjuet2c0.execute-api.us-east-1.amazonaws.com",
              logLevel: "debug",
              changeOrigin: true,
              pathRewrite: {
                '^/api_block': '/api_block', // rewrite path
              }            
            }
          }
      }
  }
  