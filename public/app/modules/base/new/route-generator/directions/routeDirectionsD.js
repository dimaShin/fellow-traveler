/**
 * Created by iashind on 24.02.15.
 */
define([], function(){
    function routeDirectionsD(gApi){
        var markers = {};
        function createRoute($scope){
            if($scope.route.end && $scope.route.start){
                $scope.routeData.$setValidity('routing', true);
                gApi.createRoute({
                    map: $scope.map,
                    origin: new google.maps.LatLng($scope.route.start.lat , $scope.route.start.lng),
                    destination: new google.maps.LatLng($scope.route.end.lat , $scope.route.end.lng)
                }).done(function(){
                    console.log('done!');
                    markers.start.setMap(null);
                    markers.end.setMap(null);
                }).fail(function(status){
                    console.log('fail to create route');
                    $scope.$apply(function(){
                        $scope.routeData.$setValidity('routing', false);
                    })

                })
            }
        }

        return{
            restrict: 'A',
            scope: true,
            templateUrl: 'app/modules/base/new/route-generator/directions/directions.html',
            link: function($scope, el){
                var mapWrp = el.find('.map-wrp'),
                    initialMapSize = {
                        width: mapWrp.width(),
                        height: mapWrp.height()
                    }, mapEventListener;

                $scope.pointOnMap = function point(target){
                    gApi.resizeMap(mapWrp, {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        width: '100%',
                        height: '100%',
                        'z-index': 500
                    }, $scope.map, document.body);
                    $(document.body).off('.escListener').on('keydown.escListener', function(evt){
                        if(evt.keyCode === 27){
                            gApi.resizeMap(mapWrp, {
                                position: 'initial',
                                width: initialMapSize.width + 'px',
                                height: initialMapSize.height + 'px',
                                'z-index': 500
                            }, $scope.map, el);
                            google.maps.event.removeListener(mapEventListener);
                        }
                    })

                    mapEventListener = google.maps.event.addListenerOnce($scope.map, 'click', function(evt){
                        var latLng = evt.latLng;

                        gApi.resizeMap(mapWrp, {
                            position: 'initial',
                            width: initialMapSize.width + 'px',
                            height: initialMapSize.height + 'px',
                            'z-index': 500
                        }, $scope.map, el);
                        if(markers[target]) markers[target].setMap(null);
                        markers[target] = gApi.addMarker({
                            map: $scope.map,
                            latLng: latLng,
                            title: target,
                            animation: google.maps.Animation.DROP
                        })
                        $scope.map.setCenter(latLng);
                        $scope.$apply(function(){
                            $scope.route[target] = {
                                lat: latLng.lat(),
                                lng: latLng.lng()
                            };
                        });

                        createRoute($scope);
                    })
                }
            },
            controller: function($scope, gApi){
                $scope.map = {};

                function formatter(ctx){
                    return function(value){
                        var model = this;
                        model.$setValidity('latToString', true);
                        model.$setValidity('stringToLat', true);
                        if(value && value.lat){
                            gApi.convert({latLng: value})
                                .done(function(result){
                                    model.$viewValue = result[0].formatted_address;
                                    model.$render();
                                    $scope.$apply(function(){
                                        model.$setValidity('required', true);
                                    })
                                }).fail(function(status){
                                    $scope.$apply(function(){
                                        model.$setValidity('latToString', false);
                                    })
                                })
                            return '';
                        }
                        return value;
                    }.bind(ctx)

                };

                function parser(ctx){
                    return function(value){
                        //value += ' Харьков';
                        console.log('parser: ', value);
                        var model = this;
                        if(value){
                            model.$setValidity('latToString', true);
                            model.$setValidity('stringToLat', true);
                            if(markers[model.$name]) markers[model.$name].setMap(null);
                            gApi.convert({address: value}).done(function(result) {
                                $scope.$apply(function () {
                                    $scope.route[model.$name] = result[0].geometry.location;
                                    model.$setValidity('parse', true);
                                })

                                markers[model.$name] = gApi.addMarker({
                                    map: $scope.map,
                                    latLng: result[0].geometry.location,
                                    title: model.$name,
                                    animation: google.maps.Animation.DROP
                                })
                                $scope.map.setCenter(result[0].geometry.location);
                                createRoute($scope);
                            }).fail(function(){
                                $scope.$apply(function(){
                                    model.$setValidity('stringToLat', false);
                                })
                            });
                            return undefined;
                        }
                        return value;
                    }.bind(ctx)
                };

                var parentScopeWaiter = $scope.$watch(
                    function routeDataWaiting($scope){
                        return $scope.routeData.start
                    },
                    function(value){
                        if(value){
                            $scope.routeData.start.$parsers.push(parser($scope.routeData.start));
                            $scope.routeData.end.$parsers.push(parser($scope.routeData.end));
                            $scope.routeData.start.$formatters.push(formatter($scope.routeData.start));
                            $scope.routeData.end.$formatters.push(formatter($scope.routeData.end));
                            parentScopeWaiter();
                        }
                    }
                )
                $scope.addMarker = function(){
                    createRoute($scope);
                }
            }
        }
    }

    return routeDirectionsD;
})