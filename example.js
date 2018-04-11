/**
 * Created by Alexandr on 11.04.2018.
 */
const http = require("http");
const GitHub = require('github-api-node');



const gh = new GitHub({
    username: 'testApiUserBrainbeanApps',
    password: 'testApiUserBrainbeanAppsPassword',
    auth: "basic"
});



list = (since = 0, cb) => {
    gh._request('GET', '/users?since='+since, null, cb);
}

serialize = function(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

list(0, (err, users) => {
    users.map((user) => {
        post({
            'UID': user.login,
            'description': 'id: '+user.id+'\nlogin: '+user.login
        })
    });
});
var options = {
    host: '127.0.0.1',
    port: 9000,
    method: 'POST'
};
post=(data) => {
    options.path = '/users?' + serialize(data);
    http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }).end();
}

/*

function qweqwe(since = 0) {
    return new Promise((resolve, reject) => {
            gh._request('GET', '/users?since='+since, null, (err,res) => {
                if(!err)
                    resolve(res);
                else
                    reject(err);
            });
        })
}

res = await qweqwe(since );

console.log(res)*/