/**
 * Created by iashind on 20.02.15.
 */
define(['async!googleMapsApi'], function(){
    function mapDrcv(){
        return {
            restrict: 'E',
            scope: true,
            template: '<div class="map-wrp"/>',
            replace: true,
            link: function($scope, el, attr){
                var map = new google.maps.Map(el[0], {
                    center: new google.maps.LatLng('50.008410','36.239539'),
                    disableDefaultUI: true,
                    zoom: 12
                })
            },
            controller: function($scope){
                console.log('map: ', google);
            }
        }
    }
    return mapDrcv;
})