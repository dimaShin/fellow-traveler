/**
 * Created by iashind on 23.02.15.
 */
define([], function(){
    function personalsCtrl($scope, $state){
        $scope.isActive = function(routeName){
            return $state.current.name === routeName
        }
    }

    return personalsCtrl;
})