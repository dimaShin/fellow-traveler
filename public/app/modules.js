/**
 * Created by iashind on 17.02.15.
 */
define(['angular'], function(){
    console.log('modules');
    angular.module('driver', []);
    angular.module('traveler', []);
    angular.module('login', []);
    require(['modules/drvCollector', 'modules/lgnCollector', 'modules/tvlCollector'], function(){

    })
})