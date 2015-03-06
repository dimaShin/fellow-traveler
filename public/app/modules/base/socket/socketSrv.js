/**
 * Created by iashind on 18.02.15.
 */
define(['socketIO'], function(io){
    console.log('socketS');
    function socketSrv($http){
        console.log('sock serv')
        //var socket = io('/', {reconnect: false});
        //socket.on('connection', function(data){
        //})
        return {
            //client: socket,

            //regUser: function regUser(user){
            //    var deferred = $.Deferred();
            //    $http.get('/http').success(function(data, status, headers, config){
            //        console.log()
            //    }).error(function (data, status, headers, config){
            //
            //    })
            //    socket.removeAllListeners('regResp');
            //    socket.emit('regReq', user);
            //    socket.on('regResp', function(resp){
            //        if(resp){
            //            deferred.resolve();
            //        }else{
            //            deferred.reject();
            //        }
            //    })
            //    return deferred.promise();
            //},
            //checkSmsCode: function checkSmsCode(code){
            //    var deferred = $.Deferred();
            //    socket.removeAllListeners('smsCodeResp');
            //    socket.emit('smsCodeReq', code);
            //    socket.on('smsCodeResp', function(isValid){
            //        if(isValid){
            //            deferred.resolve();
            //        }else{
            //            deferred.reject();
            //        }
            //    })
            //    return deferred.promise();
            //},
            loginUser: function login(user){
                var deferred = $.Deferred();

                $http.post('/jx-login', user, {
                    responseType: 'json'
                }).success(function(data, status, headers, config) {
                    if(data.length){
                        deferred.resolve(data[0].id);
                    }else{
                        deferred.reject(null);
                    }
                }).error(function(data, status, headers, config) {
                    deferred.reject(status);
                    console.log('error: ', data, status, headers, config)
                })

                //socket.removeAllListeners('loginResp');
                //socket.emit('loginReq', user);
                //socket.on('loginResp', function(resp){
                //    if(resp){
                //        deferred.resolve();
                //    }else{
                //        deferred.reject();
                //    }
                //})
                return deferred.promise();
            },
            //isLogin: function isLogin(){
            //    var deferred = $.Deferred();
            //    socket.removeAllListeners('isLoginResp');
            //    socket.emit('isLoginReq', 1);
            //    socket.on('isLoginResp', function(resp){
            //        if(resp){
            //            deferred.resolve(resp);
            //        }else{
            //            deferred.reject();
            //        }
            //    })
            //    return deferred.promise();
            //},
            //getUserPersonals: function getUser(){
            //    var deferred = $.Deferred();
            //    socket.removeAllListeners('userPersonalsResp');
            //    socket.emit('userPersonalsReq', {});
            //    socket.on('userPersonalsResp', function(personals){
            //        if(personals) {
            //            deferred.resolve(personals);
            //        } else{
            //            deferred.resolve({});
            //        }
            //    });
            //    return deferred.promise();
            //}
        }
    }

    return socketSrv;
})