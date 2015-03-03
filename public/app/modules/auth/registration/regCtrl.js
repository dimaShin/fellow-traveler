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
                    },
                    codesValidation: {
                        rule: function(value){
                            var codes = [38063, 38093, 38050, 38066, 38067, 38099, 38098];
                            if(!value || value.length < 12) return true;
                            value += '';
                            return -1 !== codes.indexOf(+value.substr(0, 5));
                        }
                    }
                }
            }
        }
        $scope.user = {
            phone: 123
        };
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
        };
        $scope.setMobileCode = function(value){
            console.log('booo', arguments);
            console.log('set code: ', value);
            if(!$scope.user.phone) $scope.user.phone = '';
            if($scope.user.phone && $scope.user.phone.length < 5){
                $scope.user.phone = value;
            }else{
                $scope.user.phone = value + $scope.user.phone.substr(5);
            }
        }
        console.log($scope.setMobileCode)
    }
    return regCtrl;
})