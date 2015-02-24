/**
 * Created by shin on 22.02.2015.
 */
define([], function(){

    function setAnimatedCss(el, css, animationOpts, time){
        el.css('transition', animationOpts);
        setTimeout(function(){
            el.css('transition', 'initial');
        }, time);
        el.css(css);
    }

    function slidePanel($swipe){
        return {
            restrict: 'AE',
            scope: {
                lugIcoEl: '='
            },
            transclude: true,
            templateUrl: 'app/modules/base/slide-panel/slide-panel.html',
            compile: function(el, attr){
                var side = attr.slidePanel,
                    icoClass = attr.panelIcoClass,
                    width = $(window).width(),
                    lug;

                return {
                    //ToDo: count el.height
                    pre: function preLink($scope, el){
                        var lug = el.find('.slide-lug');

                        el.addClass('slide-panel-' + side);
                        el.css({
                            display: 'block',
                            width: width
                        }).css(side, -width);
                        $scope.icoClass = icoClass;
                    },
                    post: function link($scope, el){
                        var lug = el.find('.slide-lug'),
                            originX, originSide;
                        lug.on('click.togglePanel', function(){
                            var css = {};
                            css[side] = el.css(side) === '0px' ? -width : 0;
                            setAnimatedCss(el, css, 'all 200ms ease-in', 220);
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
                                    absDiff = Math.abs(diff),
                                    swipeDirection = diff < 0 ? 'left' : 'right',
                                    css = {};

                                if(absDiff > 10){
                                    css[side] = swipeDirection === side ? -el.width() : 0;
                                    setAnimatedCss(el, css, 'all .1s ease-out', 100);
                                }else{
                                    css[side] = swipeDirection === side ? 0 : -el.width();
                                    setAnimatedCss(el, css, 'all .1s ease-out', 100);
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