/**
 * Created by iashind on 24.02.15.
 */
define([], function(){
    function routeDirectionsD(gApi){
        return{
            restrict: 'A',
            scope: {
                routeData: '='
            },
            templateUrl: 'app/modules/base/new/route-generator/directions/directions.html',
            link: function($scope, el, attr){
                var mapWrp = el.find('.map-wrp'),
                    initialMapSize = {
                        width: mapWrp.width(),
                        height: mapWrp.height()
                    }, markers = [];

                $scope.pointOnMap = function point(geo, target){
                    console.log('geo: ', geo, ' target: ', target);
                    mapWrp.css({
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        'z-index': 500
                    }).appendTo(document.body);
                    google.maps.event.trigger($scope.map, "resize");
                    google.maps.event.addListenerOnce($scope.map, 'click', function(evt){
                        var latLng = evt.latLng;

                        mapWrp.css({
                            position: 'initial',
                            width: initialMapSize.width + 'px',
                            height: initialMapSize.height + 'px',
                            'z-index': 500
                        }).appendTo(el);
                        google.maps.event.trigger($scope.map, "resize");

                        markers.push(gApi.addMarker({
                            map: $scope.map,
                            latLng: latLng,
                            title: target,
                            animation: google.maps.Animation.DROP
                        }))
                        $scope.map.setCenter(latLng);
                        $scope.$apply(
                            function(){
                                geo[target] = latLng;
                            }
                        );


                        gApi.createRoute({
                            map: $scope.map,
                            origin: $scope.geo.start,
                            destination: $scope.geo.end
                        }).done(function(){
                            console.log('done!');
                            for(var i = 0; i < markers.length; i++){
                                markers[i].setMap(null);
                            }
                        })
                    })
                }
            },
            controller: function($scope, gApi){
                $scope.map = {};
                $scope.geo = {};

                function formatter(ctx){
                    return function(value){
                        var model = this;
                        if(value && value.lat){
                            gApi.convert({latLng: value})
                                .done(function(result){
                                    model.$viewValue = result[0].formatted_address;
                                    model.$render();
                                }).fail(function(status){

                                })
                            return '';
                        }
                        return value;
                    }.bind(ctx)

                }
                function parser(ctx){
                    return function(value){
                        console.log('parser');
                        var model = this;
                        if(value){
                            model.$setValidity('converting', true);
                            gApi.convert({address: value})
                                .done(function(result){
                                    model.$modelValue = result[0].geometry.location;
                                }).fail(function(status){
                                    console.log('status: ', model);
                                    $scope.$apply(function(){
                                        model.$setValidity('converting', false);
                                    })

                                })
                            return undefined;
                        }
                        return value;
                    }.bind(ctx)
                }
                $scope.$watch(
                    function($scope){
                        return $scope.routeData.start
                    }, function(value){
                        if(value){
                            $scope.routeData.start.$parsers.push(parser($scope.routeData.start));
                            $scope.routeData.end.$parsers.push(parser($scope.routeData.end));
                            $scope.routeData.start.$formatters.push(formatter($scope.routeData.start));
                            $scope.routeData.end.$formatters.push(formatter($scope.routeData.end));
                        }
                    }
                )
                $scope.addMarker = function(){
                    gApi.createRoute({
                        map: $scope.map,
                        origin: $scope.geo.start,
                        destination: $scope.geo.end
                    }).done(function(){
                        console.log('done!');
                        for(var i = 0; i < markers.length; i++){
                            markers[i].setMap(null);
                        }
                    }).reject(function(status){
                        if(status){
                        }
                    })
                }

            }
        }
    }

    return routeDirectionsD;
})