/**
 * Created by iashind on 02.03.15.
 */
define([], function(){

    function mobileCodesD(){
        return {
            restrict: 'A',
            scope: {
                model: '=ngModel'
            },
            require: '^form',
            link: function($scope, el, attr, ctrl){
                console.log('controller: ', ctrl);
                var index = 0,
                    codes = attr['mobileCodes'].split(' ');

                el.on('click', function(){
                    var code = codes[index];
                    if(!$scope.dot.model) $scope.dot.model = '';
                    if($scope.dot.model.length > code.length){
                        $scope.$apply(function(){
                            $scope.dot.model = code + $scope.dot.model.substr(code.length);
                        });
                    }else{
                        $scope.$apply(function(){
                            $scope.dot.model = code;
                        });
                    }
                    if(!codes[++index]) index = 0;
                })
            },
            controller: function($scope){
                $scope.dot = $scope;
            }
        }
    }

    return mobileCodesD;
})