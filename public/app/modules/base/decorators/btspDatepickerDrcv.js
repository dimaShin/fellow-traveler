/**
 * Created by iashind on 24.02.15.
 */
define(['bootstrap-datepicker'], function(){
    function btspDatepicker(){
        return {
            restrict: 'A',
            scope: {
                onChange: '&'
            },
            link: function link($scope, el, attr){
                $(document).ready(function(){
                    el.datetimepicker({
                        locale: 'en'
                    })
                        .on('dp.change', $scope.onChange());
                })
            },
            controller: function(){
                console.log('datepicker ctrl');
            }
        }


    }

    return btspDatepicker;
})