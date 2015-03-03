/**
 * Created by iashind on 19.02.15.
 */
define([], function(){
    function phoneNumberDrcv(){
        function replaceNotDigits(value){
            return value.replace(/\D/g, '');
        }

        function putSpecChars(value, chars){
            var formatted = '', i = 0;
            console.log('chars:', chars);
            chars = chars || {
                0: '+',
                3: ' (',
                5: ') ',
                8: '-',
                10: '-'
            };

            value += '';
            while(value.length){
                if(chars[i]){
                    formatted += chars[i];
                }else{
                    formatted += value[0];
                    value = value.substr(1);
                }
                i++;
            }

            return formatted;
        }
        return {
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function($scope, el, attr, ctrl){
                var lastValue, lastCaretPos,
                    mask = attr.phoneNumber,
                    chars = {};
                for(var i = 0; i < mask.length; i++){
                    if(mask[i] !== 'd'){
                        chars[i] = mask[i];
                    }
                }
                console.log('mask: ', chars);
                ctrl.$parsers.push(replaceNotDigits);
                ctrl.$formatters.push(function(value){
                    if(value){
                        value += '';
                        value = replaceNotDigits(value);
                        return putSpecChars(value, chars);
                    }

                });
                //el.on('focus', function(){
                //    if(el.val() === ''){
                //        el.val('+');
                //        el[0].setSelectionRange(2, 2);
                //    }
                //})
                el.on('input', function(e){
                    var lastLength, numbers, formattedVal, newCharsCount, inputLength;

                    lastLength = el.val().length;
                    numbers = replaceNotDigits(el.val());
                    if(numbers.length > 12) numbers = numbers.substr(0, 12);
                    formattedVal = putSpecChars(numbers, chars);
                    newCharsCount = formattedVal.length - lastLength;

                    lastCaretPos = el[0].selectionEnd;
                    inputLength = !!lastValue
                        ? numbers.length - lastValue.length < 0
                        ? 0 : numbers.length - lastValue.length
                        : numbers.length;
                    var caretPos = lastCaretPos + inputLength + newCharsCount;
                    lastValue = numbers;
                    el.val(formattedVal);
                    el[0].setSelectionRange(caretPos, caretPos);
                });
            }
        }
    }

    return phoneNumberDrcv;
})