/**
 * Created by iashind on 04.03.15.
 */
var connect     = require('connect'),
    session     = require('cookie-session'),
    fs          = require('fs'),
    DB          = require('./db.js'),
    bodyParser  = require('body-parser'),
    app         = connect();

app.use(session({
    keys: ['166823325', '.ntAEAj166823325']
}))
app.use(bodyParser.json());

app.use('/jx-login', function (req, resp, next) {
    var user = req.body;
    console.log('user: ', user);
    DB.checkAuth(user.name, user.password).then(
        function onSuccess(id){
            console.log('success: ', id);
            resp.writeHead(200, {
                'Content-type': 'application/json'
            });
            resp.end(JSON.stringify(id));
        }, function onFail(err){
            resp.writeHead(200, {
                'Content-type': 'application/json'
            })
            resp.end(JSON.stringify([]));
            console.log('fail: ', err)
        }
    )

})
app.use(handler)

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
    if(url.match(/favicon/)) return;
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
    //console.log('got req: ', url);
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

var server = app.listen(80);