/**
 * Created by iashind on 24.02.15.
 */
define([], function(){
    function routeGeneratorDrcv(){
        return{
            restrict: 'A',
            scope: {
                routeData: '='
            },
            templateUrl: 'app/modules/base/new/route-generator/route-generator.html',
            link: function($scope, el, attr){
                var mapWrp = el.find('.map-wrp'),
                    initialMapSize = {
                        width: mapWrp.width(),
                        height: mapWrp.height()
                    };

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
                        $scope.$apply(
                            function(){
                                geo[target] = latLng;
                            }
                        );
                        mapWrp.css({
                            position: 'initial',
                            width: initialMapSize.width + 'px',
                            height: initialMapSize.height + 'px',
                            'z-index': 500
                        }).appendTo(el);
                        google.maps.event.trigger($scope.map, "resize");
                    })
                }
            },
            controller: function($scope){
                $scope.map = {};
                $scope.geo = {};
                function latLngConverter(data){
                    var geocoder = new google.maps.Geocoder(),
                        deferred = $.Deferred();
                    geocoder.geocode(data , function(result, status){
                        if(status === google.maps.GeocoderStatus.OK){
                            deferred.resolve(result)
                        }else{
                            deferred.reject(status);
                        }
                    })
                    return deferred.promise();
                }
                function formatter(ctx){
                    return function(value){
                        var model = this;
                        if(value && value.lat){
                            latLngConverter({latLng: value})
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
                            latLngConverter({address: value})
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

            }
        }
    }

    return routeGeneratorDrcv;
})