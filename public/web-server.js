console.log('starting http server');
var app = require('http').createServer(handler);
//var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {

    var url = req.url;
    var mimeTypes = {
        js: 'text/javascript',
        css: 'text/css',
        gif: 'image/gif',
        png: 'image/png',
        html: 'text/html',
        ogg: 'audio/ogg',
        wav: 'audio/wav',
        jsx: 'text/jsx'
    };
    //if(url.match(/favicon/)) return;
    if(!url.match(/\.\w{1,4}$/i)){
        url = 'index.html';
    }else{
        url = url.substr(1);
        var dotIndex = url.lastIndexOf('.') + 1;
        if(dotIndex !== 0){
            var ext  = url.substr(dotIndex);
            //if(ext === 'map') return;
            var mimeType = mimeTypes[ext];
            if(!mimeType) mimeType = 'text/plain';
        }

    }
    console.log('got req: ', url);
    fs.readFile(url,
        function (err, data) {
            if (err) {
                console.log('err: ', err);
                res.writeHead(500);
                return res.end('Error loading ');
            }
            res.writeHead(200, {
                'Content-type': mimeType,
                'Content-length': data.length
            });
            res.end(data);
        });
}
//io.on('connection', function(socket){
//    console.log('new socket');
//    socket.on('touch', function(time){
//        console.log('touch at: ', time);
//    })
//    socket.on('got_grid', function(time){
//        console.log('grid ready at: ', time);
//    })
//    socket.on('analyze', function(time){
//        console.log('start analyze at: ', time);
//    })
//    socket.on('analyzed', function(time){
//        console.log('analyzed at: ', time);
//    })
//    socket.on('render', function(time){
//        console.log('start render at: ', time);
//    })
//    socket.on('animation', function(time){
//        console.log('animation starts at: ', time);
//    })
//    socket.on('timing', function(timing){
//        console.log(timing);
//    })
//    //socket.on('animation', function(timestamp){
//    //    console.log('animation starts at ', timestamp);
//    //})
//    //socket.on('start_a', function(timestamp){
//    //    console.log('start analyzing line: ', timestamp);
//    //})
//    //socket.on('end_a', function(timestamp){
//    //    console.log('end analyzing line: ', timestamp);
//    //})
//    //socket.on('start_r', function(timestamp){
//    //    console.log('start rendering at: ', timestamp);
//    //})
//    //socket.on('start_getTile', function(timestamp){
//    //    console.log('start_getTile at ', timestamp);
//    //})
//    //socket.on('got_tile', function(timestamp){
//    //    console.log('got_tile at ', timestamp);
//    //})
//    //socket.on('no_tile', function(timestamp){
//    //    console.log('no_tile at ', timestamp);
//    //})
//    //socket.on('newIndex', function(data){
//    //    console.log('index changed to ', data[0], ' from ', data[1]);
//    //})
//
//
//})
