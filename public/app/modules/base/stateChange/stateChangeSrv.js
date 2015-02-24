/**
 * Created by iashind on 19.02.15.
 */
define([], function(){

    function stateChangeSrv($state, $timeout, $rootScope, authSrv, $urlRouter){
        return {
            stateWatcher: function stateWatcher(event, toState, stateParams, fromState){
                event.preventDefault();
                console.log('$stateChangeStart event fired! to state: ', toState.name, stateParams, fromState);
                if (toState.data && toState.data.secure) {
                    authSrv.isAuthorized()
                        .done(function () {
                            $state.go(toState.name, stateParams, {
                                notify: false
                            }).then(function () {
                                $rootScope.$broadcast('$stateChangeSuccess', toState, stateParams);
                            });
                        }).fail(function () {
                            $state.go('login', stateParams, {
                                location: 'replace'
                            }).then(function () {
                                $rootScope.$broadcast('$stateChangeSuccess', toState, stateParams);
                            });
                        })
                } else {
                    $state.go(toState.name, stateParams, {
                        notify: false,
                        location: 'reload',
                        reload: true
                    }).then(function () {
                        $rootScope.$broadcast('$stateChangeSuccess', toState, stateParams);
                    });
                }
            }
        }
    }

    return stateChangeSrv;
})