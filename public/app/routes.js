/**
 * Created by iashind on 17.02.15.
 */
define(['modules'], function(){

    angular.module('base').config(function($stateProvider, $urlRouterProvider, $locationProvider, stateHelperProvider) {
        $stateProvider
            .state('login', {
                templateUrl: 'app/modules/auth/login/login.html',
                controller: 'loginCtrl',
                url: '/login'
            }).state('new', {
                templateUrl: 'app/modules/base/new/new.html',
                controller: 'newCtrl',
                abstract: true,
                url: '/new',
                data: {
                    secure: true
                }
            }).state('new.driver', {
                templateUrl: 'app/modules/base/new/driver/driver.html',
                controller: 'driverCtrl',
                url: '/driver'
            }).state('new.traveler', {
                templateUrl: 'app/modules/base/new/traveler/traveler.html',
                controller: 'travelerCtrl',
                url: '/traveler'
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
            }).state('user-info', {
                templateUrl: 'app/modules/base/user-info/user-info.html',
                controller: 'userInfoCtrl',
                url: '/user',
                abstract: true,
                data: {
                    secure: true
                }
            }).state('user-info.personal', {
                templateUrl: 'app/modules/base/user-info/personal-info/personal-info.html',
                controller: 'personalInfoCtrl',
                url: '/personal'
            }).state('user-info.auth', {
                templateUrl: 'app/modules/base/user-info/auth-info/auth-info.html',
                controller: 'authInfoCtrl',
                url: '/auth'
            })
        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode({
            enabled: true
        });
    });

})