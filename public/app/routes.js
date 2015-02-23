/**
 * Created by iashind on 17.02.15.
 */
define(['modules'], function(){

    angular.module('base').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('login', {
                templateUrl: 'app/modules/auth/login/login.html',
                controller: 'loginCtrl',
                url: '/login'
            }).state('secure', {
                abstract: true,
                data: {
                    secured: true
                }
            }).state('map', {
                data: {
                    secure: true
                },
                templateUrl: 'app/modules/base/map/map.html',
                controller: 'mapCtrl',
                url: '/map'
            }).state('registration', {
                templateUrl: 'app/modules/auth/registration/registration.html',
                controller: 'regCtrl',
                url: '/registration'
            }).state('confirm', {
                templateUrl: 'app/modules/auth/confirm/confirm.html',
                controller: 'confirmCtrl',
                url: '/confirm'
            })
        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

})