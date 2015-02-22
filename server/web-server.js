console.log('starting http server');
var fs = require('fs');

var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var DB = {
    usersPath: '../server/DB/users.fdb',
    getUsers: function getUsers(){
        fs.readFile(DB.usersPath, function(err, data){
            console.log('open users file: ', err, data.toJSON());
        })
    },
    addUser: function addUser(user){
        fs.readFile(DB.usersPath, user, function(err, users){
            users = users.toJSON();
            console.log('json user: ', users);
            users[user.email] = user;
            console.log('add user: ', users);
            fs.writeFile(DB.usersPath, users, function(err){
                console.log('writeFile: ', err);
            })

        })
    }
}
var users = {
    'dmitri_shin@list.ru' :{
        name: 'dima',
        pwd: '166823325',
        email: 'dmitri_shin@list.ru'
    }
};

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
        user.id = Math.ceil(Math.random() * 1000000);
        user.socket = socket;
        users[user.email] = user;
        socket.emit('regResp', true);
    })
    socket.on('smsCodeReq', function(code){
        socket.emit('smsCodeResp', code === '111111');
    })
    socket.on('loginReq', function(loginData){
        var isValid, user;
        if(loginData){
            console.log('got login req: ', loginData);
            if(-1 === loginData.name.indexOf('@')){
                console.log('name - name');
                user = getUserByKey('name', loginData.name);
            }else{
                console.log('name - email');
                user = users[name];
            }
            if(user && user.pwd === loginData.password) {
                console.log('valid pair')
                isValid = true;
            }else{
                console.log('invalid pair');
            }
        }else{
            user = getUserByKey('socket', socket);
            if(user) isValid = true;
        }
        socket.emit('loginResp', isValid);
        if(isValid) {
            user.login = true;
            user.sessid = Math.ceil(Math.random() * 1000000);
        }
    })
    socket.on('isLoginReq', function(){
        var user = getUserByKey(socket),
            sessid = user && user.login ? user.sessid: undefined;

        socket.emit('isLoginResp', sessid);
    })

})
