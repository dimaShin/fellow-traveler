/**
 * Created by iashind on 20.02.15.
 */
define(['async!googleMapsApi'], function(){
    function mapDrcv(gApi){
        return {
            restrict: 'EA',
            scope: true,
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
                    $scope.$parent.map = gApi.newMap(el, {
                        id: attr['mapId'],
                        zoom: zoom
                    });

                    map = $scope.$parent.map;
                    google.maps.event.addListener(map, 'tilesloaded', function(){
                        console.log('tiles loaded');
                    })
                }
            },
            controller: function($scope){
                console.log('map: ', $scope);
            }
        }
    }
    return mapDrcv;
})