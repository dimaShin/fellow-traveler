/**
 * Created by iashind on 17.02.15.
 */
define(['modules', 'ui-router'], function(){
    console.log('app');
    var App = angular.module('main', ['ui.router', 'driver', 'traveler', 'login']);

    return App;
})