/**
 * Created by iashind on 17.02.15.
 */
requirejs.config({
    paths: {
        angular: '../vendor/angular.min',
        bootstrap: '../vendor/bootstrap.min',
        jquery: '../vendor/jquery.min'
    },
    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        bootstrap: {
            deps: ['jquery', '../vendor/underscore.min']
        }
    }
})

require(['app'], function(app){
    console.log(app);
    angular.bootstrap(document.body, ['app']);
})