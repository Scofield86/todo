var http = require('http'),
    fs = require('fs'),
    port = "8000";

http.createServer(function (req, res) {

    var request = "./" + req.url;
    console.log(request);
    if (req.url === "/") {

        fs.readFile('./index.html', function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
    else if (req.url.indexOf('.html') != -1) {

        fs.readFile(request, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });

    }
    else if (req.url.indexOf('.js') != -1) {

        fs.readFile(request, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end(data);
        });

    }
    else if (req.url.indexOf('.css') != -1) {

        fs.readFile(request, function (err, data) {
            if (err) console.log(err);
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
        });
    }
    else if (req.url === "/data.csv")
    {
        fs.readFile('./data.csv', 'utf-8', function (err, data) {

            function ToDoElement(id, text, bool) {
                var self = this;
                self.toDoText = text;
                self.id = id;
                self.done = bool;
            }

            var lines = data.split('\r\n');
            var arr = [];

            lines.forEach(function (line) {
                var parts = line.split(';');
                arr.push(new ToDoElement(parts[0], parts[1], parts[2]));
            });
            //  process.stdout.write("\u001b[2J\u001b[0;0H"); // CMD Clear();
            console.log(arr);
            res.writeHead(200, {
                'Content-Type': 'text/json; charset=utf-8', 'Access-Control-Allow-Origin': 'http://localhost:63342'
            });

            res.end(JSON.stringify(arr));

        });
    }
}).listen(port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:' + port + '/');