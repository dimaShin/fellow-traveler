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
            link: function($scope, el, attr){
                var index = 0,
                    codes = attr['mobileCodes'].split(' ');

                el.on('click', function(){
                    var code = codes[index];
                    $scope.dot = $scope;
                    if(!$scope.dot.model) $scope.dot.model = '';
                    console.log('phone: ', $scope.dot.model, $scope.model)
                    if($scope.dot.model.length > 5){
                        $scope.$apply(function(){
                            $scope.dot.model = code + $scope.dot.model.substr(5);
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

            }
        }
    }

    return mobileCodesD;
})