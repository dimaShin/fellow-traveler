/**
 * Created by iashind on 18.02.15.
 */
define([], function(){
    angular.module('login').directive('setPwdLevel', function(){
        return {
            restrict: 'A',
            scope: {},
            require: 'ngModel',
            link: function($scope, el, attr, ctrl){
                $scope.$watch(function(){
                    return ctrl.$viewValue;
                }, function(value){
                    var className, level;
                    el.removeClass('pwd-level-weak pwd-level-medium pwd-level-strong').html('');
                    if(value){
                        level = 0;
                        if(value.toUpperCase() !== value) level++;
                        if(/\d/.test(value)) level++;
                        if(/[,:!_\.\-]/.test(value)) level++;
                        switch(level){
                            case 3: className = 'strong'; break;
                            case 2: className = 'medium'; break;
                            default: className = 'weak';
                        }
                        el.addClass('pwd-level-' + className).html(className);
                    }
                });
            }
        }
    })
})