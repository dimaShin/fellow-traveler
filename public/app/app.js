/**
 * Created by iashind on 17.02.15.
 */
define(['angular', 'bootstrap'], function(){

    var App = angular.module('app', []);

    App.controller('mainCtrl', function appCtrl($scope){
        $scope.items = [1,2,3,4,5];
    }).directive('myTransclude', function(){
        return {
            restrict: 'E',
            transclude: 'element',
            link: function($scope, el, attr, ctrl, transclude){
                console.log('el: ', el[0]);
                console.log('ctrl: ', ctrl);
                console.log('transclude: ', transclude);
                transclude($scope, function(clone){
                    console.log('clone: ', clone);
                    el.after(clone);
                })
            }
        }
    })

    return App;
})