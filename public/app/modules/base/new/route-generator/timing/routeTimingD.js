/**
 * Created by iashind on 26.02.15.
 */
define(['moment'], function(){
    function routeTimingD(){
        moment.locale('en');

        return{
            restrict: 'AE',
            scope: true,
            templateUrl: 'app/modules/base/new/route-generator/timing/timing.html',
            link: function($scope, el, attr){

            },
            controller: function($scope){
                var weekdays = moment.weekdays(),
                    months = moment.months();
                $scope.opts = {};

                function updateOpts(time, handler){
                    if($scope.opts.unix && $scope.opts.unix === time.unix()) return;
                    $scope.opts = {
                        unix: +time.unix(),
                        allWeek: time.weekday() < 6 && time.weekday() !== 0 ? 'weekday(monday - friday)' : 'weekend(saturday - sunday)',
                        weekly: weekdays[time.weekday()],
                        monthly: time.date(),
                        yearly: months[time.month()] + ' ' + time.date()
                    }
                }

                $scope.$watch(
                    function(){
                        return $scope.route.time
                    },
                    function(time){
                        if(!time){
                            time = moment();
                        }
                        updateOpts(time, 'onWatcher');
                    }
                )

                var routeDataWatcher = $scope.$watch(
                    function($scope){
                        return $scope.routeData ? $scope.routeData.time : undefined;
                    },
                    function(model){
                        if(model && model.$parsers){
                            model.$parsers.push(function(value){
                                var time = moment(value);
                                $scope.routeData.time.$setValidity('convert', true);
                                if(time.isValid()){
                                    return +time.format('x');
                                }else{
                                    $scope.routeData.time.$setValidity('convert', false);
                                    return undefined;
                                }
                            })
                            routeDataWatcher();
                        }
                    }
                )

                $scope.onDateChange = function(evt){
                    $scope.$apply(function(){
                        $scope.route.time = evt.date;
                        updateOpts(evt.date, 'onDateChange');
                    })
                }
            }
        }
    }

    return routeTimingD;
})