/**
 * Created by iashind on 19.02.15.
 */
define([], function(){
    function phoneNumberDrcv(){
        function replaceNotDigits(value){
            return value.replace(/\D/g, '');
        }
        function putSpecChars(value){
            var formatted = '+',
                chars = {
                    4: ' ',
                    5: '(',
                    8: ')',
                    9: ' ',
                    13: '-',
                    16: '-'
                };

            value += '';
            for(var i=1; i <= 18; i++){
                if(chars[i]){
                    formatted += chars[i];
                }else if(value.length){
                    formatted += value[0];
                    value = value.substr(1);
                }else{
                    formatted += ' ';
                }
            }

            return formatted;
        }

        return {
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function($scope, el, attr, ctrl){
                var validCodes = attr['phoneNumber'].split(' ');
                console.log('valid codes: ', validCodes);
                console.log('ngModel: ', ctrl);
                ctrl.$parsers.push(replaceNotDigits);
                //el.on('focus', function(){
                //    if(el.val() === ''){
                //        el.val('+380 (  )    -  -')
                //    }
                //})
                //el.on('input', function(e){
                //    var numbers = replaceNotDigits(el.val()),
                //        formattedVal = putSpecChars(numbers);
                //    console.log('caret: ', el.caret().start);
                //    el.val(formattedVal);
                //    console.log(formattedVal);
                //    console.log('event: ', e);
                //});
                //el.on('keydown', function(evt){
                //    console.log('keyCode: ', evt.keyCode);
                //    if(evt.keyCode === 8) 1
                //})
            }
        }
    }

    return phoneNumberDrcv;
})