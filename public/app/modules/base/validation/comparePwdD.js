/**
 * Created by iashind on 03.03.15.
 */
define([], function(){
    function comparePwdD(){
        return {
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function($scope, el, attr, ngModel){
                ngModel.$validators['pwdMatch'] = function(value){
                    return value === attr.comparePasswords;
                }
            }
        }
    }

    return comparePwdD;
})