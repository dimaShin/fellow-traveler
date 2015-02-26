/**
 * Created by iashind on 25.02.15.
 */
define([], function(){

    function googleMapsApiS(){
        var maps = {},
            defMap = {
                center: new google.maps.LatLng('50.008410','36.239539'),
                disableDefaultUI: true,
                zoom: 12,
                draggable: true,
                scrollwheel: true,
                zoomControl: true
            },
            directionsDisplay = new google.maps.DirectionsRenderer(),
            directionsService = new google.maps.DirectionsService();


        return {
            convert: function latLngConverter(data){
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
            },
            newMap: function(el, opts){
                $.extend(defMap, opts);
                return new google.maps.Map(el[0], defMap);
            },
            createRoute: function(opts){
                var deferred = $.Deferred();
                if(!opts.map || !opts.origin || !opts.destination) {
                    deferred.reject();
                    return deferred.promise();
                }

                var routeOpts = {
                    origin: opts.origin,
                    destination: opts.destination,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                directionsDisplay.setMap(opts.map);

                directionsService.route(routeOpts, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                        deferred.resolve();
                    }else{
                        console.log('status: ', status);
                        deferred.reject();
                    }
                });
                return deferred.promise();

            },
            addMarker: function(opts){
                return new google.maps.Marker({
                    position: opts.latLng,
                    map: opts.map,
                    title: opts.title
                });
            }
        }
    }

    return googleMapsApiS;
})