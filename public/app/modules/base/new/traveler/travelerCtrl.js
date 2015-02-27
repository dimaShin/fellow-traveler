/**
 * Created by iashind on 24.02.15.
 */
define([], function(){
    function travelerCtrl($scope){
        $scope.route = {}
        $scope.save = function(){
            console.log('saving');
        }
    }

    return travelerCtrl;
})