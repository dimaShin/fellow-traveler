/**
 * Created by iashind on 24.02.15.
 */
define(['bootstrap-datepicker'], function(){
    function btspDatepicker(){
        return {
            restrict: 'A',
            scope: true,
            link: function link($scope, el, attr){
                console.log('link function');
                $(document).ready(function(){
                    el.datetimepicker({
                        locale: 'ru'
                    });
                })
            },
            controller: function(){
                console.log('datepicker ctrl');
            }
        }


    }

    return btspDatepicker;
})