'use strict';
let express = require('express');

const session = require('express-session');
const bodyParser = require('body-parser');
const mong = require('mongoose');
const app = express();

mong.connect('mongodb://localhost/codeweb', function (err) {
    app.listen(3021);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'codeweb',
    resave: false,
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