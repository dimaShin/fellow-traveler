/**
 * Created by iashind on 23.02.15.
 */
define([], function(){

    function userPersonals(){
        return{
            restrict: 'EA',
            scope: {

            },
            templateUrl: 'app/modules/base/forms/user-personals.html',
            link: function($scope, el, attr){
                console.log('user personals');
            },
            controller: function($scope, socketSrv){

                socketSrv.getUserPersonals().done(function(userPersonals){
                    var defaults = {
                        avatarUrl: (userPersonals.gender == '2') ? '/img/default_avatar_female.png' : '/img/default_avatar_male.png'
                    };
                    $.extend(defaults, userPersonals);
                    console.log(defaults, userPersonals);
                    $scope.$apply(function(){
                        $scope.user = defaults;
                    })


                });
            }

        }
    }

    return userPersonals;
})