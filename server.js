/**
 * Required files and initializations
 */
var express = require('express'),
    fs = require("fs"),
    ini = require('ini');

var config = ini.parse(fs.readFileSync(__dirname + '/server/shared/config/config.ini', 'utf-8'));

app = express();

/**
 * Static routes
 */
app.use('/app', express.static('./client'));

/**
 * Available routes
 */
app.get('/', function (req, res) {
    res.redirect('/app');
});

/**
 * HTTP Server
 */
var server = app.listen(8080, 'localhost', function () {
    console.log('Listening at http://localhost:8080/');
});
