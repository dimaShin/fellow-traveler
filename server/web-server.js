console.log('starting http server');
var fs = require('fs');

var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var DB = require('./db.js');

Object.defineProperty(Object.prototype, "extend", {
    enumerable: false,
    value: function(to, from) {
        var propsFrom = Object.getOwnPropertyNames(from),
            propsTo = Object.getOwnPropertyNames(to);
        var dest = {};

        propsFrom.forEach(function(name) {
            var destination = Object.getOwnPropertyDescriptor(to, name);
            Object.defineProperty(to, name, destination);
        });
        propsTo.forEach(function(name) {
            var destination = Object.getOwnPropertyDescriptor(from, name);
            Object.defineProperty(dest, name, destination);
        });
        return dest;
    }
});

var users = [];

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



function getUserByKey(key, value){
    for(var i in users){
        if(users[i][key] === value) return users[i];
    }
}

io.on('connection', function(socket){
    socket.on('isUniqueReq', function(email){
        socket.emit('isUniqueResp', !(!!users[email]));
    })
    socket.on('regReq', function(user){
        DB.addUser(user).then(
            function onSuccess(id){
                console.log('added user id: ', id);
                user.socket = socket;
                user.id = id;
                users.push(user);
                socket.emit('regResp', true);
            },
            function onFail(err){
                socket.emit('regResp', false);
                console.log('reg fail: ', err);
            }
        )
    })
    socket.on('smsCodeReq', function(code){
        var user;
        if(code === '111111'){
            socket.emit('smsCodeResp', true);
            user = getUserByKey('socket', socket);
            user.login = true;
            user.sessid = Math.ceil(Math.random() * 1000000000);
        }
    })

    socket.on('loginReq', function(loginData){
        DB.checkAuth(loginData.name, loginData.password).then(
            function onSuccess(uId){
                socket.emit('loginResp', uId);
                console.log('uid: ', uId);
                users.push({
                    id: uId,
                    login: true,
                    sessid: Math.ceil(Math.random() * 1000000000)
                })
            },
            function onFail(err){
                if(err){
                    console.log('auth error: ', err)
                }else{
                    socket.emit('loginResp', false);
                }
            }
        )
    })
    socket.on('isLoginReq', function(){
        var user = getUserByKey(socket),
            sessid = user && user.login ? user.sessid: undefined;

        socket.emit('isLoginResp', sessid);
    })
    socket.on('userPersonalsReq', function(){
        var user = getUserByKey(socket),
            personals = {};
        if(user){
            personals.email = user.email;
            personals.phone = user.phone;
            personals.email = user.email;
        }
        if(user.personals){
            personals.extend(user.personals);
        }
        socket.emit('userPersonalsResp', personals);
    })

})
