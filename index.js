var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var url = require('url');
var path = require('path');

app.listen(process.env.PORT || 5000);

function handler (req, res) {
    var uri = url.parse(req.url).pathname;
    if (uri == '/') { uri = uri + '.html'; }
    fs.readFile(__dirname + '/public' + uri,
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
