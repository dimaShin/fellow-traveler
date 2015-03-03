/**
 * Created by iashind on 18.02.15.
 */
define([], function(){
    console.log('reg ctrl');
    function regCtrl($scope, socketSrv, $state, validationData){
        $scope.validation = validationData.getData();
        $scope.user = {};
        $scope.register = function(){
            $scope.registration.email.$setValidity('unique', true);
            if(!$scope.registration.$valid) return;
            socketSrv.uniqueEmail($scope.user.email)
                .done(function(){
                    socketSrv.regUser($scope.user)
                        .done(function(){
                            $state.go('confirm');
                        }).fail(function(){
                            console.log('registration fail');
                        })
                }).fail(function(){
                    $scope.$apply(function(){
                        $scope.registration.email.$setValidity('unique', false);
                    })
                })
            console.log('user: ', $scope.user);
        };
    }
    return regCtrl;
})