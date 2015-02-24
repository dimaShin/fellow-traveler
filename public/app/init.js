/**
 * Created by iashind on 17.02.15.
 */
requirejs.config({
    paths: {
        angular: '../vendor/angular/angular.min',
        'twitter-bootstrap': '../vendor/bootstrap/bootstrap',
        'bootstrap-datepicker': '../vendor/bootstrap/bootstrap-datetimepicker',
        jquery: '../vendor/jquery/jquery.min',
        async: '../vendor/requirejs/require-async',
        googleMapsApi: 'https://maps.googleapis.com/maps/api/js?v=3&callback=isNaN&language=ru',
        'ui-router': '../vendor/angular/angular-ui-router',
        socketIO: 'https://cdn.socket.io/socket.io-1.3.4',
        ngAnimate: '../vendor/angular/angular-animate.min',
        ngTouch: '../vendor/angular/angular-touch.min',
        ngStateHelper: '../vendor/angular/statehelper',
        moment: '../vendor/bootstrap/moment-with-locales'
        //'jCaret': '../vendor/jquery/jquery.caret.1.02',
        //'jquery.1.8': '../vendor/jquery/jquery-1.8.3.min'
    },
    shim: {
        ngStateHelper: {
            deps: ['angular']
        },
        googleMapsApi: {
            exports: 'google'
        },
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        moment: {
            exports: 'moment'
        },
        'twitter-bootstrap': {
            deps: ['jquery', '../vendor/underscore/underscore.min']
        },
        'ui-router': {
            deps: ['angular']
        },
        ngAnimate: {
            deps: ['angular']
        },
        ngTouch: {
            deps: ['angular']
        },
        'bootstrap-datepicker': {
            deps: ['twitter-bootstrap', 'moment']
        }
    }
})


require(['components',  'twitter-bootstrap'], function(){
    console.log('init!');
    angular.module('base').run(function($rootScope, stateChangeSrv) {
            $rootScope.$on('$stateChangeStart', stateChangeSrv.stateWatcher);
        }
    );
    angular.bootstrap(document.body, ['base']);
})



