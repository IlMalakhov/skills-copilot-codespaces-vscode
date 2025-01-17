// Create web server

var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];

var server = http.createServer(function(request, response) {
    var urlObj = url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', function(err, data) {
            if (err) {
                response.writeHead(404, 'Not Found', {
                    'Content-Type': 'text/html;charset=utf-8'
                });
                response.end('404, Not Found.');
                return;
            }
            var htmlStr = '';
            comments.forEach(function(comment) {
                htmlStr += '<p>' + comment + '</p>';
            });
            data = data.replace('<!-- 评论列表 -->', htmlStr);
            response.setHeader('Content-Type', 'text/html;charset=utf-8');
            response.end(data);
        });
    } else if (pathname == '/post') {
        var comment = urlObj.query.comment;
        comments.push(comment);
        response.statusCode = 302;
        response.setHeader('Location', '/');
        response.end();
    } else {
        static(pathname, response);
    }
});

function static(pathname, response) {
    fs.readFile(path.join(__dirname, pathname), 'binary', function(err, data) {
        if (err) {
            response.writeHead(404, 'Not Found', {
                'Content-Type': 'text/html;charset=utf-8'
            });
            response.end('404, Not Found.');
            return;
        }
        response.writeHead(200, 'Ok');
        response.write(data, 'binary');
        response.end();
    });
}

server.listen(8080, 'localhost');