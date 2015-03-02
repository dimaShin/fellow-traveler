/**
 * Created by iashind on 19.02.15.
 */
define([], function(){
    function phoneNumberDrcv(){
        function replaceNotDigits(value){
            return value.replace(/\D/g, '');
        }

        function validateCodes(codes){
            return function(value){
                var code;
                if(!value || value.length < 12) return true;
                code = +value.substr(0, 5);
                console.log('code : ', code);
                return -1 !== codes.indexOf(code);
            }
        }

        function putSpecChars(value){
            var formatted = '+',
                chars = {
                    3: ' (',
                    5: ') ',
                    8: '-',
                    10: '-'
                }, i = 0;

            value += '';
            while(value.length){
                if(chars[i]){
                    formatted += chars[i] + value[0];
                }else{
                    formatted += value[0];
                }
                value = value.substr(1);
                i++;
            }

            return formatted;
        }

        return {
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function($scope, el, attr, ctrl){
                var validCodes = attr['phoneNumber'].split(' '),
                    lastValue, lastCaretPos;
                ctrl.$parsers.push(replaceNotDigits);
                ctrl.$validators['codesValidation'] = validateCodes(validCodes);
                el.on('focus', function(){
                    if(el.val() === ''){
                        el.val('+')
                    }
                })
                el.on('input', function(e){
                    var lastLength = el.val().length,
                        numbers = replaceNotDigits(el.val()),
                        formattedVal = putSpecChars(numbers),
                        newCharsCount = formattedVal.length - lastLength,
                        inputLength;
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