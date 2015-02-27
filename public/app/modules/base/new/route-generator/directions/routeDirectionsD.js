/**
 * Created by iashind on 24.02.15.
 */
define([], function(){
    function routeDirectionsD(gApi){
        var markers = [];
        return{
            restrict: 'A',
            scope: true,
            templateUrl: 'app/modules/base/new/route-generator/directions/directions.html',
            link: function($scope, el){
                var mapWrp = el.find('.map-wrp'),
                    initialMapSize = {
                        width: mapWrp.width(),
                        height: mapWrp.height()
                    };

                $scope.pointOnMap = function point(target){
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
                                $scope.route[target] = latLng;
                            }
                        );


                        gApi.createRoute({
                            map: $scope.map,
                            origin: $scope.route.start,
                            destination: $scope.route.end
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

                function formatter(ctx){
                    return function(value){
                        console.log('formatter: ', value);
                        var model = this;
                        if(value && value.lat){
                            gApi.convert({latLng: value})
                                .done(function(result){
                                    model.$viewValue = result[0].formatted_address;
                                    model.$render();
                                    $scope.$apply(function(){

                                        model.$setValidity('required', true);
                                    })

                                    //
                                }).fail(function(status){

                                })
                            return '';
                        }
                        return value;
                    }.bind(ctx)

                };
                function parser(ctx){
                    return function(value){
                        value += ' Харьков';
                        console.log('parser: ', value);
                        var model = this;
                        if(value){
                            model.$setValidity('converting', true);
                            gApi.convert({address: value})
                                .done(function(result){
                                    $scope.$apply(function(){
                                        $scope.route[model.$name] = result[0].geometry.location;
                                        model.$setValidity('parse', true);
                                    })
                                    markers.push(gApi.addMarker({
                                        map: $scope.map,
                                        latLng: result[0].geometry.location,
                                        title: model.$name,
                                        animation: google.maps.Animation.DROP
                                    }))
                                    $scope.map.setCenter(result[0].geometry.location);
                                    gApi.createRoute({
                                        map: $scope.map,
                                        origin: $scope.route.start,
                                        destination: $scope.route.end
                                    }).done(function(){
                                        console.log('done!');
                                        for(var i = 0; i < markers.length; i++){
                                            markers[i].setMap(null);
                                        }
                                    })

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
                    gApi.createRoute({
                        map: $scope.map,
                        origin: $scope.route.start,
                        destination: $scope.route.end
                    }).done(function(){
                        console.log('done!');
                        for(var i = 0; i < markers.length; i++){
                            markers[i].setMap(null);
                        }
                    }).fail(function(status){
                        if(status){
                            console.log('route generating fail.') //ToDo validation alert
                        }
                    })
                }

            }
        }
    }

    return routeDirectionsD;
})