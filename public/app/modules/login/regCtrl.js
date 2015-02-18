/**
 * Created by iashind on 18.02.15.
 */
define([], function(){
    angular.module('login').controller('regCtrl', ['$scope', function($scope){
        console.log('reg ctrl: ', $scope);
        var patterns = {
            pwd: /^[\w,:!\.\-]*$/
        }
        $scope.validation = {
            formName: 'registration',
            name: {
                valid: true,
                rules: {
                    namePattern : {
                        rule: function (value) {
                            return /^\w*$/.test(value);
                        },
                        text: 'Invalid name'
                    }
                }
            },
            email: {
                valid: true,
                rules: {
                    emailPattern :{
                        rule: function(value){
                            return /^\w+@\w+\.\w{2,4}$/.test(value);
                        },
                        text: 'Invalid email'
                    }
                }
            },
            pwd: {
                valid: true,
                rules: {
                    pwdPattern: {
                        rule: function(value){
                            return patterns.pwd.test(value);
                        },
                        text: 'Invalid password'
                    },
                    length: {
                        rule: function(value){
                            return value && value.length > 8 && value.length < 20;
                        },
                        text: 'Length must be from 8 to 20'
                    }
                }
            },
            rptPwd: {
                valid: true,
                rules: {
                    pwdMatch: {
                        rule: function (value) {
                            return value === $scope.user.pwd
                        },
                        text: "Passwords don't match"
                    }
                }
            }
        }
        $scope.user = {};
        $scope.register = function(){
            if(!$scope.registration.$valid) return;
            console.log('user: ', $scope.user);
        }
    }])
})