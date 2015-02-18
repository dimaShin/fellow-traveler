/**
 * Created by iashind on 17.02.15.
 */
define(['ui-router'], function(){
    console.log('routes');
    angular.module('main').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        function authentication(){

        }
        $stateProvider
            .state('login', {
                templateUrl: 'app/modules/login/login.html',
                controller: 'loginCtrl',
                url: '/login'
            })
            .state('secure', {
                abstract: true,
                resolve: authentication
            })
            .state('secured.driver', {
                templateUrl: 'app/modules/driver/drvIndex.html',
                controller: 'drvCtrl',
                url: '/driver'
            })
            .state('secured.traveler', {
                templateUrl: 'app/modules/traveler/trvlIndex.html',
                controller: 'trvlCtrl',
                url: '/traveler'
            })
        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });

})