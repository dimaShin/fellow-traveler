/**
 * Created by iashind on 18.02.15.
 */
define([], function(){
    angular.module('login').directive('validate', function(){
        return{
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function($scope, el, attr, ctrl){
                console.log('ctrl: ', ctrl);
                var fieldName   = attr.validate,
                    rules       = $scope.validation[fieldName].rules;
                for(var i in rules){
                    ctrl.$validators[i] = rules[i].rule;
                }
                console.log('validators: ',ctrl.$validators);
            }
        }
    })
})