/**
 * Created by iashind on 06.03.15.
 */
var spaceBarReg = new RegExp('\\s', 'g'),
    rules = {
        name: [
            function(value){
                return spaceBarReg.test(value);
            }
        ],
        password: [
            function(value){
                return spaceBarReg.test(value);
            }
        ],
        email: [
            function(value){
                return spaceBarReg.test(value);
            }
        ],
        phone: [
            function(value){
                return spaceBarReg.test(value);
            }
        ]
    }
exports.validate = function validate(data){
    var name, value, i, j;
    for(i = 0; i < data.length; i++){
        name = data[i].name;
        value = data[i].value;
        if(data[i].rules){
                for(j = 0; j < data[i].rules; j++){
                    if(!data[i].rules[i](value)) return false;
            }
        }
        if(rules[name]){
            for(j = 0; j < rules[name].length; j++){
                if(!rules[name](value)) return false;
            }
        }
    }
    return true;
}