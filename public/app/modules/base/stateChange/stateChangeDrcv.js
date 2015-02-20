/**
 * Created by iashind on 19.02.15.
 */
define([], function(){
    function stateChangeDrcv($rootScope){
        return {
            restrict: 'A',
            scope: true,
            transclude: true,
            template: '<div ng-transclude />',
            link: function($scope, el){
                el.css({
                    transition: 'margin-top ' + $scope.aDuration + 'ms'
                });
                $scope.$on('stateSrv:off', function(){
                    el.css({
                        'margin-top': '-110vh'
                    })
                });
                $scope.$on('stateSrv:on', function(){
                    el.css({
                        'margin-top': '0'
                    })
                })
            },
            controller: function($scope, stateChangeSrv){
                $scope.aDuration = stateChangeSrv.aDuration;
            }
        }
    }

    return stateChangeDrcv;
})
