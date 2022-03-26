const {Server} = require('node-static');
const http = require('http')
const { readFile } = require('fs')

module.exports.serveDir = async (path, port=8000) => {
    const fileServer = new Server(path, { cache: 1,   headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    return new Promise(resolve => {
        resolve(http.createServer((request, response) => {
            request.addListener('end', function () {
                fileServer.serve(request, response);
            }).resume()
        }).listen(port))
    });
}

module.exports.serveUi = async (filePath, port=8080) => {
    return new Promise(resolve => {
        resolve(http.createServer((req, res) => {
            readFile(filePath, function (err,data) {
                if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }   
                res.writeHead(200);
                res.end(data);
                return true
            });
            }).listen(port, resolve))     
    })
}
