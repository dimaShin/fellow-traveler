/**
 * Created by iashind on 18.02.15.
 */
define(['socketIO'], function(io){
    console.log('socketS');
    function socketSrv(){
        var socket = io();
        socket.on('connection', function(data){
        })
        return {
            client: socket,
            uniqueEmail: function uniqueEmail(email){
                var deferred = $.Deferred();
                socket.removeAllListeners('isUniqueResp');
                socket.emit('isUniqueReq', email);
                socket.on('isUniqueResp', function(isUnique){
                    if(isUnique){
                        deferred.resolve();
                    }else{
                        deferred.reject();
                    }
                })
                return deferred.promise();
            },
            regUser: function regUser(user){
                var deferred = $.Deferred();
                socket.removeAllListeners('regResp');
                socket.emit('regReq', user);
                socket.on('regResp', function(resp){
                    if(resp){
                        deferred.resolve();
                    }else{
                        deferred.reject();
                    }
                })
                return deferred.promise();
            },
            checkSmsCode: function checkSmsCode(code){
                var deferred = $.Deferred();
                socket.removeAllListeners('smsCodeResp');
                socket.emit('smsCodeReq', code);
                socket.on('smsCodeResp', function(isValid){
                    if(isValid){
                        deferred.resolve();
                    }else{
                        deferred.reject();
                    }
                })
                return deferred.promise();
            },
            loginUser: function login(user){
                var deferred = $.Deferred();
                socket.removeAllListeners('loginResp');
                socket.emit('loginReq', user);
                socket.on('loginResp', function(resp){
                    if(resp){
                        deferred.resolve();
                    }else{
                        deferred.reject();
                    }
                })
                return deferred.promise();
            },
            isLogin: function isLogin(){
                var deferred = $.Deferred();
                socket.removeAllListeners('isLoginResp');
                socket.emit('isLoginReq', 1);
                socket.on('isLoginResp', function(resp){
                    if(resp){
                        deferred.resolve(resp);
                    }else{
                        deferred.reject();
                    }
                })
                return deferred.promise();
            },
            getUserPersonals: function getUser(){
                var deferred = $.Deferred();
                socket.removeAllListeners('userPersonalsResp');
                socket.emit('userPersonalsReq', {});
                socket.on('userPersonalsResp', function(personals){
                    if(personals) {
                        deferred.resolve(personals);
                    } else{
                        deferred.resolve({});
                    }
                });
                return deferred.promise();
            }
        }
    }

    return socketSrv;
})