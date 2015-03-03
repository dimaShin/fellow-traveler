/**
 * Created by iashind on 03.03.15.
 */
define([], function(){

    function validationS(){

        var patterns = {
            pwd: /^[\w,:!\.\-]*$/
            },
            validationData = {
                name: {
                    rules: {
                        namePattern : {
                            rule: function (value) {
                                return /^\w*$/.test(value);
                            },
                            text: 'Invalid name'
                        }
                    }
                },
                email: {
                    rules: {
                        emailPattern :{
                            rule: function(value){
                                return /^\w+@\w+\.\w{2,4}$/.test(value);
                            },
                            text: 'Invalid email'
                        }
                    }
                },
                pwd: {
                    rules: {
                        pwdPattern: {
                            rule: function(value){
                                return patterns.pwd.test(value);
                            },
                            text: 'Invalid password'
                        },
                        length: {
                            rule: function(value){
                                return value && value.length > 8 && value.length < 20;
                            },
                            text: 'Length must be from 8 to 20'
                        }
                    }
                },
                phone: {
                    rules: {
                        phonePattern: {
                            rule: function(value){
                                return /^\d+$/.test(value)
                            },
                            text: 'Invalid phone number'
                        },
                        codesValidation: {
                            rule: function(value){
                                var codes = ['38063', '38093', '38050', '38066', '38067', '38099', '38098'];
                                if(!value || value.length < 12) return true;
                                value += '';
                                for(var i = 0; i < codes.length; i++){
                                    var code = value.substr(0, codes[i].length);
                                    if(code === codes[i]) return true;
                                }
                                return false;
                            }
                        }
                    }
                }
            }

        return {
            getData: function(){
                return validationData;
            }
        }
    }

    return validationS;
})