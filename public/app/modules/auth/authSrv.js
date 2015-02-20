/**
 * Created by iashind on 19.02.15.
 */
define([], function(){
    function authSrv(socketSrv){
        sessionStorage = {
            setItem: function setItem(key, value){
                if(window.sessionStorage) {
                    window.sessionStorage.setItem(key, value);
                    return true;
                }else{
                    return false;
                }
            },
            getItem: function getItem(key){
                if(window.sessionStorage) return window.sessionStorage.getItem(key);
            }
        }
        return {
            isAuthorized: function isAuth(){
                var deferred = $.Deferred(), sessid;
                if(sessid = sessionStorage.getItem('sessid')){
                    deferred.resolve(sessid);
                }else{
                    socketSrv.isLogin()
                        .done(function(sessid){
                            sessionStorage.setItem('sessid', sessid);
                            deferred.resolve(sessid);
                        }).fail(function(){
                            deferred.reject();
                        })
                }
                return deferred.promise();
            },
            loginUser: function(user){
                var deferred = $.Deferred();
                socketSrv.loginUser(user).done(
                    function(sessid){
                        sessionStorage.setItem('sessid', sessid);
                        deferred.resolve(sessid)
                    }
                ).fail(
                    function(){
                        deferred.reject();
                    }
                )

                return deferred.promise();
            }
        }
    }

    return authSrv;
})