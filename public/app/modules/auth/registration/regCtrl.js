/**
 * Created by iashind on 18.02.15.
 */
define([], function(){
    console.log('reg ctrl');
    function regCtrl($scope, socketSrv, $state){
        var patterns = {
            pwd: /^[\w,:!\.\-]*$/
        }
        $scope.validation = {
            formName: 'registration',
            name: {
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
                rules: {
                    pwdMatch: {
                        rule: function (value) {
                            return value === $scope.user.pwd
                        },
                        text: "Passwords don't match"
                    }
                }
            },
            phone: {
                rules: {
                    phonePattern: {
                        rule: function(value){
                            return /^\d+$/.test(value)
                        },
                        text: 'Invalid phone number'
                    }
                }
            }
        }
        $scope.user = {};
        $scope.register = function(){
            $scope.registration.email.$setValidity('unique', true);
            if(!$scope.registration.$valid) return;
            socketSrv.uniqueEmail($scope.user.email)
                .done(function(){
                    socketSrv.regUser($scope.user)
                        .done(function(){
                            $state.go('confirm');
                        }).fail(function(){
                            console.log('registration fail');
                        })
                }).fail(function(){
                    $scope.$apply(function(){
                        $scope.registration.email.$setValidity('unique', false);
                    })
                })
            console.log('user: ', $scope.user);
        }
    }
    return regCtrl;
})