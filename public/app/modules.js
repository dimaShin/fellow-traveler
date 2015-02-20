/**
 * Created by iashind on 17.02.15.
 */
define(['angular', 'ui-router'], function(){
    console.log('modules');
    angular.module('driver', []);
    angular.module('traveler', []);
    angular.module('auth', []);
    angular.module('base', ['driver', 'traveler', 'auth', 'ui.router']);
})