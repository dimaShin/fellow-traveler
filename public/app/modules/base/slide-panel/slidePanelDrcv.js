/**
 * Created by shin on 22.02.2015.
 */
define([], function(){

    function slidePanel(){
        return {
            restrict: 'AE',
            scope: true,
            transclude: true,
            templateUrl: 'app/modules/base/slide-panel/slide-panel.html',
            compile: function(el, attr){
                var side = attr.slidePanel,
                    header = attr.panelHeader,
                    width = attr.panelWidth,
                    lug;

                return {
                    //ToDo: count el.height
                    pre: function preLink($scope, el, attr){
                        el.addClass('slide-panel-' + side);
                        el.css({
                            display: 'block',
                            width: width
                        }).css(side, -width);
                        $scope.header = header;
                    },
                    post: function link($scope, el, attr){
                        var lug = el.find('.slide-lug');
                        lug.on('click.togglePanel', function(){
                            el.css(side) === '0px'
                                ? el.css(side, -width)
                                : el.css(side, 0)
                        })
                    }
                }
            }
        }
    }

    return slidePanel
})