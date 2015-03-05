/**
 * Created by iashind on 18.02.15.
 */
define([], function(){
    console.log('loginCtrl');
    function loginCtrl($scope, authSrv, $state){
        $scope.user = {};
        $scope.logIn = function(){
            console.log('user: ', $scope.user);
            $scope.loginForm.pwd.$setValidity('loginError', true);
            $scope.loginForm.pwd.$setValidity('serverError', true);
            if($scope.loginForm.$invalid) return;
            authSrv.loginUser($scope.user).done(
                function(){
                    $state.go('map');
                }
            ).fail(
                function(status){
                    $scope.apply(function(){
                        status
                            ? $scope.loginForm.pwd.$setValidity('serverError', false)
                            : $scope.loginForm.pwd.$setValidity('loginError', false);
                    })
                }
            )
        }
        console.log('login ctrl: ', $scope);
    }

    return loginCtrl;
})