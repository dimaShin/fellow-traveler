/**
 * Created by iashind on 25.02.15.
 */
define([], function(){

    function loadingD(){
        return {
            restrict: 'A',
            template: '<span class="glyphicon glyphicon-refresh animated-glyph"/>',
            scope: {
                showLoader: '='
            },
            link: function($scope, el){
                console.log(el.width() > el.height(), el.height() * .5, el.width() * .8);
                var glyphSize = el.width() > el.height() ? el.height() * .5 : el.width() * .5,
                    padLeft = (el.width() - glyphSize) / 2,
                    padTop = (el.height() - glyphSize) / 2;


                el.css({
                    fontSize: glyphSize + 'px',
                    paddingTop: padTop + 'px',
                    paddingLeft: padLeft + 'px'
                })

                console.log('show loader');
                //$scope.$watch(
                //    function($scope){
                //        return $scope.hideOn
                //    },
                //    function whenHide(value){
                //        if(value){
                //            el.css('opacity')
                //        }
                //    }
                //)
            }
        }
    }

    return loadingD
})