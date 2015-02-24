/**
 * Created by iashind on 20.02.15.
 */
define(['async!googleMapsApi'], function(){
    function mapDrcv(){
        return {
            restrict: 'EA',
            scope: true,
            replace: true,
            link: function($scope, el, attr){

                el.css({
                    width:  el.parent().width(),
                    height: el.parent().height()
                })
                var zoom = +attr.zoom || 12,
                    map = new google.maps.Map(el[0], {
                        center: new google.maps.LatLng('50.008410','36.239539'),
                        disableDefaultUI: true,
                        zoom: zoom,
                        draggable: true,
                        scrollwheel: true,
                        zoomControl: true
                    }
                )
            },
            controller: function($scope){
                console.log('map: ', google);
            }
        }
    }
    return mapDrcv;
})