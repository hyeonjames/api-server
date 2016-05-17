'use strict';
let express = require('express');

const session = require('express-session');
const bodyParser = require('body-parser');
const mong = require('mongoose');
const app = express();
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisClient = redis.createClient();
const cors = require('cors');

mong.connect('mongodb://localhost/codeweb', function (err) {
    app.listen(3021);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin : /code404\.co\.kr$/
}));
app.use(session({
    secret: 'codeweb',
    resave: false,
    store: new redisStore({
        host : 'localhost',
        port : 6379,
        client : redisClient
    }),
    saveUninitialized: true
}))
const routes = {
    '/account': './routes/account.js'
}

for (let route in routes) {
    let url = routes[route];
    let exports = require(url);
    let Router = express.Router();
    exports(Router, app);
    app.use(route, Router);
}


//    app.listen(80);