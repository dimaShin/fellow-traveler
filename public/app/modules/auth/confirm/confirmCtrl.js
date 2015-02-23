/**
 * Created by iashind on 19.02.15.
 */
define([], function(){
    function confirmCtrl($scope, socketSrv, stateChangeSrv){
        $scope.code = ''
        $scope.confirmCode = function confirm(code){
            $scope.confirm.code.$setValidity('valid', true);
            socketSrv.checkSmsCode(code)
                .done(function(){
                    console.log('valid code. start login');
                    socketSrv.loginUser()
                        .done(function(){
                            stateChangeSrv.go('map');
                        }).fail(function(){
                            console.log('login error');
                        })

                }).fail(function(){
                    $scope.$apply(function(){
                        $scope.confirm.code.$setValidity('valid', false);
                    })

                })
            console.log('confirm code: ', code);
        }
    }

    return confirmCtrl;
})