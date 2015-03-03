/**
 * Created by iashind on 18.02.15.
 */
define([], function(){
    console.log('validateD');
    function validate(){
        return{
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function($scope, el, attr, ctrl){
                var fieldName   = attr.validate,
                    rules       = $scope.validation[fieldName] ? $scope.validation[fieldName].rules : 0;
                for(var i in rules){
                    ctrl.$validators[i] = rules[i].rule;
                }
            }
        }
    }

    return validate;
})