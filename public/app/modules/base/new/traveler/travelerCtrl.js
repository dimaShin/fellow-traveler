/**
 * Created by iashind on 24.02.15.
 */
define([], function(){
    function travelerCtrl($scope){
        $scope.route = {}
        window.traveler = $scope.route;
    }

    return travelerCtrl;
})