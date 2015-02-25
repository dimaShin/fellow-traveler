/**
 * Created by iashind on 20.02.15.
 */
define(['async!googleMapsApi'], function(){
    function mapDrcv(){
        return {
            restrict: 'EA',
            scope: true,
            //replace: true,
            //transclude: true,
            //template: '<div class="loading-wrp" loading ng-if="showLoader"/>',
            compile: function(el){
                el.css({
                    width:  '100%',
                    height: '100%'
                });
                return function($scope, el, attr){
                    var zoom = +attr.zoom || 12, map,
                        mapEl = document.createElement('div');

                    $(mapEl).css({
                        width: '100%',
                        height: '100%'
                    });
                    el.append(mapEl);
                    $scope.$parent.map = new google.maps.Map(mapEl, {
                        center: new google.maps.LatLng('50.008410','36.239539'),
                        disableDefaultUI: true,
                        zoom: zoom,
                        draggable: true,
                        scrollwheel: true,
                        zoomControl: true
                    })
                    map = $scope.$parent.map;
                    google.maps.event.addListener(map, 'tilesloaded', function(){
                        $scope.showLoader = false;
                        console.log('tiles loaded');
                    })
                }
            },
            controller: function($scope){
                console.log('map: ', $scope);
                $scope.showLoader = true;
            }
        }
    }
    return mapDrcv;
})