/**
 * Created by iashind on 24.02.15.
 */
define([], function(){
    function personalInfoCtrl($scope, socketSrv){
        socketSrv.getUserPersonals().done(function(userPersonals){
            var defaults = {
                avatarUrl: (userPersonals.gender == '2') ? '/img/default_avatar_female.png' : '/img/default_avatar_male.png'
            };
            $.extend(defaults, userPersonals);
            $scope.$apply(function(){
                $scope.user = defaults;
            })
        });
    }

    return personalInfoCtrl;
})