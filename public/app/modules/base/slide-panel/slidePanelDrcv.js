/**
 * Created by shin on 22.02.2015.
 */
define([], function(){

    function slidePanel($swipe){
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
                    pre: function preLink($scope, el){
                        el.addClass('slide-panel-' + side);
                        el.css({
                            display: 'block',
                            width: width
                        }).css(side, -width);
                        $scope.header = header;
                    },
                    post: function link($scope, el){
                        var lug = el.find('.slide-lug'),
                            originX, originSide;
                        lug.on('click.togglePanel', function(){
                            el.css('transition', 'all .25s ease-out');
                            setTimeout(function(){
                                el.css('transition', 'initial');
                            }, 250)
                            el.css(side) === '0px'
                                ? el.css(side, -width)
                                : el.css(side, 0)
                        });
                        $swipe.bind(lug, {
                            start: function(evt){
                                originX = evt.x;
                                originSide = parseInt(el.css(side));
                            },
                            move: function(evt){
                                var diff, swipeDirection, absDiff, newValue;
                                diff = evt.x - originX;
                                absDiff = Math.abs(diff);
                                swipeDirection = diff < 0 ? 'left' : 'right';

                                newValue = (side !== swipeDirection)
                                    ? originSide + absDiff
                                    : originSide - absDiff;

                                if(newValue < 0 && Math.abs(newValue) <= el.width()){
                                    el.css(side, newValue);
                                }
                            },
                            end: function(evt){
                                var diff = evt.x - originX,
                                    absDiff = Math.abs(diff);
                                if(absDiff > 10){
                                    var swipeDirection = diff < 0 ? 'left' : 'right';
                                    if(swipeDirection === side){
                                        el.css(side, -el.width());
                                    }else{
                                        el.css(side, 0);
                                    }
                                }
                            }
                        })
                    }
                }
            }
        }
    }

    return slidePanel
})