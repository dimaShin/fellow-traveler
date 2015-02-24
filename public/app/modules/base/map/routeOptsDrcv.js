/**
 * Created by iashind on 20.02.15.
 */
define([], function(){

    function routeOptsDrcv(){
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'app/modules/base/map/routeOpts.html',
            replace: true,
            link: function($scope, el, attr){
                console.log("!!!!");
            }
        }
    }

    return routeOptsDrcv;
})