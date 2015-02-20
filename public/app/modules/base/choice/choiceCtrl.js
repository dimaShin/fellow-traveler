/**
 * Created by iashind on 19.02.15.
 */
define([], function(){
    function choiceCtrl($scope, $state){
        $scope.stateChange = function stateChange(state){
            $state.go(state);
        }
    }

    return choiceCtrl;
})