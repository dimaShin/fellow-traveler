/**
 * Created by iashind on 17.02.15.
 */
requirejs.config({
    paths: {
        angular: '../vendor/angular.min',
        bootstrap: '../vendor/bootstrap.min',
        jquery: '../vendor/jquery.min',
        async: 'require-async',
        googleMapsApi: 'https://maps.googleapis.com/maps/api/js?v=3&callback=isNaN&language=ru',
        'ui-router': '../vendor/angular-ui-router',
        socketIO: 'https://cdn.socket.io/socket.io-1.3.4',
        //'jCaret': '../vendor/jquery.caret.1.02',
        //'jquery.1.8': '../vendor/jquery-1.8.3.min'
    },
    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        bootstrap: {
            deps: ['jquery', '../vendor/underscore.min']
        },
        'ui-router': {
            deps: ['angular']
        },
        jquery: {
            exports: 'jQuery'
        },
        //jCaret: {
        //    deps: ['jquery.1.8']
        //}
    }
})


require(['components',  'bootstrap'], function(){
    angular.module('base').run(function($rootScope, $state, stateChangeSrv, $timeout, authSrv) {
            $rootScope.$on('$stateChangeStart', stateChangeSrv.stateWatcher);
        }
    );
    angular.bootstrap(document.body, ['base']);
})



