/**
 * Created by iashind on 18.02.15.
 */
define([
    'modules/base/slide-panel/slidePanelDrcv',
    'modules/base/socket/socketSrv',
    'modules/base/stateChange/stateChangeSrv',
    'modules/base/map/mapDrcv',
    'modules/base/map/routeOptsDrcv',
    'modules/auth/registration/regCtrl',
    'modules/auth/login/loginCtrl',
    'modules/base/map/mapCtrl',
    'modules/auth/registration/validateDrcv',
    'modules/auth/registration/setPwdLevelDrcv',
    'modules/auth/registration/phoneNumberDrcv',
    'modules/auth/authSrv',
    'modules/auth/confirm/confirmCtrl',
    'modules/base/personals/userPersonalsCtrl',
    'modules/base/new/newCtrl',
    'modules/base/new/driver/driverCtrl',
    'modules/base/new/traveler/travelerCtrl',
    'modules/base/btspDatepickerDrcv',
    'routes'],
function(slidePanelDrcv, socketSrv, stateChangeSrv,
         mapDrcv, routeOptsDrcv, regCtrl, loginCtrl,
         mapCtrl, validateDrcv, setPwdLevelDrcv, phoneNumberDrcv,
         authSrv, confirmCtrl, userPersonalsCtrl, newCtrl,
         driverCtrl, travelerCtrl, btspDatepickerDrcv
){

    console.log('injector!: ');

    angular.module('base')  .factory('socketSrv',           socketSrv);
    angular.module('base')  .factory('stateChangeSrv',      stateChangeSrv);
    angular.module('auth')  .factory('authSrv',             authSrv);

    angular.module('auth')  .controller('regCtrl',          regCtrl);
    angular.module('auth')  .controller('loginCtrl',        loginCtrl);
    angular.module('auth')  .controller('confirmCtrl',      confirmCtrl);
    angular.module('base')  .controller('mapCtrl',          mapCtrl);
    angular.module('base')  .controller('userPersonalsCtrl',userPersonalsCtrl);
    angular.module('base')  .controller('newCtrl',          newCtrl);
    angular.module('base')  .controller('driverCtrl',       driverCtrl);
    angular.module('base')  .controller('travelerCtrl',     travelerCtrl);

    angular.module('auth')  .directive('validate',          validateDrcv);
    angular.module('auth')  .directive('setPwdLevel',       setPwdLevelDrcv);
    angular.module('auth')  .directive('phoneNumber',       phoneNumberDrcv);
    angular.module('base')  .directive('mapContainer',      mapDrcv);
    angular.module('base')  .directive('routeOpts',         routeOptsDrcv);
    angular.module('base')  .directive('slidePanel',        slidePanelDrcv);
    angular.module('base')  .directive('btspDatepicker',btspDatepickerDrcv);
})