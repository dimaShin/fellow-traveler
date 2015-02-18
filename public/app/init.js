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
        'ui-router': '../vendor/angular-ui-router'
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
        }
    }
})

require(['app'], function(){
    console.log('require');
    require(['collector',  'bootstrap'], function(){
        console.log('init');
        angular.bootstrap(document.body, ['main']);
    })
})