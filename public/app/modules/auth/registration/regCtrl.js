/**
 * Created by iashind on 18.02.15.
 */
define([], function(){
    console.log('reg ctrl');
    function regCtrl($scope, socketSrv, $state, validationData){
        $scope.validation = validationData.getData();
        $scope.user = {};
        $scope.register = function(){
            $scope.registration.$setValidity('unique', true);
            if(!$scope.registration.$valid) return;
            socketSrv.regUser($scope.user)
                .done(function(){
                    $state.go('confirm');
                }).fail(function(){
                    $scope.$apply(function(){
                        $scope.registration.$setValidity('unique', false);
                    })
                })

            console.log('user: ', $scope.user);
        };
    }
    return regCtrl;
})