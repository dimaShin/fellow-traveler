/**
 * Created by iashind on 24.02.15.
 */
define([], function(){
    function newCtrl($scope, $state, validationData){
        $scope.isActive = function(routeName){
            return $state.current.name === routeName
        }

        $scope.validation = validationData.getData();
    }

    return newCtrl;
})