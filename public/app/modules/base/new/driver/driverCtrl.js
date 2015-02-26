/**
 * Created by iashind on 24.02.15.
 */
define([], function(){
    function driverCtrl($scope){
        console.log('driver ctrl: ', $scope);
        $scope.route = {};
    }

    return driverCtrl;
})