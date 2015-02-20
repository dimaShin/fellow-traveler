/**
 * Created by iashind on 19.02.15.
 */
define([], function(){

    function stateChangeSrv($state, $timeout, $rootScope, authSrv, $urlRouter){

        var aDuration = 500;
        function animateChange(state, params){
            $rootScope.$broadcast('stateSrv:off');
            $timeout(function(){
                console.log('state: ', state, params);
                $state.go(state, {}, params);
                $rootScope.$broadcast('stateSrv:on');
            }, aDuration)
        }

        function hideView(){
            var deferred = $.Deferred();
            $rootScope.$broadcast('stateSrv:off');
            setTimeout(function(){
                deferred.resolve()
            }, aDuration);
            return deferred.promise();
        }

        function showView(){
            $rootScope.$broadcast('stateSrv:on');
            //$timeout(function(){
            //
            //}, aDuration)
        }



        return {
            go: function go(state, params){
                hideView().then(
                    function(){
                        $state.go(state, {}, {
                            notify: false
                        }).then(function () {
                            $rootScope.$broadcast('$stateChangeSuccess', state, {});
                            showView();
                        });
                    }
                )
                $state.go(state, {}, params);
            },
            hideView: hideView,
            showView: showView,
            stateWatcher: function stateWatcher(event, toState, stateParams, fromState){
                if(fromState.name){
                    event.preventDefault();
                    console.log('$stateChangeStart event fired! to state: ', toState.name, stateParams, fromState);
                    hideView().done(function() {
                        if (toState.data && toState.data.secure) {
                            event.preventDefault();
                            authSrv.isAuthorized()
                                .done(function () {
                                    $state.go(toState.name, stateParams, {
                                        notify: false
                                    }).then(function () {
                                        $rootScope.$broadcast('$stateChangeSuccess', toState, stateParams);
                                        showView();
                                    });
                                }).fail(function () {
                                    $state.go('login', stateParams, {
                                        location: 'replace'
                                    }).then(function () {
                                        $rootScope.$broadcast('$stateChangeSuccess', toState, stateParams);
                                        showView();
                                    });
                                })
                        } else {
                            $state.go(toState.name, stateParams, {
                                notify: false,
                                location: 'reload',
                                reload: true
                            }).then(function () {
                                $rootScope.$broadcast('$stateChangeSuccess', toState, stateParams);
                                showView();
                            });
                        }
                    });
                }else{
                    if(toState.data && toState.data.secure){
                        event.preventDefault();
                        authSrv.isAuthorized()
                            .done(function(){
                                $state.go(toState.name, stateParams ,{
                                    notify: false
                                }).then(function() {
                                    $rootScope.$broadcast('$stateChangeSuccess', toState, stateParams);
                                    showView();
                                });
                            }).fail(function(){
                                $state.go('login', stateParams, {
                                    location: 'replace'
                                }).then(function() {
                                    $rootScope.$broadcast('$stateChangeSuccess', toState, stateParams);
                                    showView();
                                });
                            })
                    }else{
                        $state.go(toState.name, stateParams ,{
                            notify: false,
                            location: 'reload',
                            reload: true
                        }).then(function() {
                            $rootScope.$broadcast('$stateChangeSuccess', toState, stateParams);
                            showView();
                        });
                    }
                }

            },
            aDuration: aDuration
        }
    }

    return stateChangeSrv;
})