/**
 * Created by iashind on 04.03.15.
 */
var mysql = require('mysql'),
    validator = require('./validator.js');
    Deferred = require('deferred');


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345',
    database : 'fellowTraveler'
});

connection.connect();

exports.checkAuth = function(user, pwd){
    var deffered = Deferred();
    if(!validator([
            {
                name: 'user',
                value: user
            },
            {
                name: 'password',
                value: pwd
            }
        ]
    )){
        deffered.reject(false);
        return deffered.promise;
    }

    connection.query('SELECT id FROM users_auth WHERE (name = ? OR email = ? OR phone = ?) AND password = ?', [user, user, user, pwd], function(err, data){
        if(err){
            console.log('auth error: ', err);
            deffered.reject(err);
            return null;
        }else if(data.length){
            console.log('get user: ', data);
            deffered.resolve(data);
        }else{
            console.log('auth failed');
            deffered.reject(false);
        }
    });
    return deffered.promise;
}
exports.addUser = function(user){
    var deffered = Deferred();
    var validateData = [
        {
            name: 'name',
            value: user.name
        },
        {
            name: 'password',
            value: user.password
        },
        {
            name: 'email',
            value: user.email
        },
        {
            name: 'phone',
            value: user.phone
        }
    ]
    if(!validator.validate(validateData)){
        deffered.reject('validate error');
        return deffered.promise;
    }
    console.log('reg user: ', user);
    connection.query('INSERT INTO users_auth (name, password, email, phone) VALUES (?, ?, ?, ?)', [user.name, user.password, user.email, user.phone], function(err, data){
        if(err){
            console.log('reg error: ', err);
            deffered.reject(err);
        }else{
            console.log('reg user: ', data);
            deffered.resolve(data.insertId);
        }
    });
    return deffered.promise;
}
