/**
 * Created by iashind on 17.02.15.
 */
define(['angular', 'ui-router', 'ngAnimate'], function(){
    console.log('modules');
    angular.module('auth', []);
    angular.module('base', ['auth', 'ui.router', 'ngAnimate']);
})