var assert = require('chai').assert;
var expect = require('chai').expect;
var unirest = require('unirest');
var ini = require('ini');
var fs = require('fs');

var config;

before(function () {

    config = ini.parse(fs.readFileSync(__dirname + '/../shared/config/config.ini', 'utf-8'));
    config.root = (config.root !== 'default' ? config.root : __dirname + '/../../');

});

describe('Test twilioCtrl class', function () {

    this.timeout(10000);
    var messages = null;
    
    beforeEach(function (done) {

        var url = config.http.protocol + '://' + config.http.host + ':' + config.http.port;
        var path = '/twilio/messages/' + config.twilio.number + '/' + config.twilio.mobile + '/';

        unirest.get(url + path).end(function (response) {

            if (response.code === 200) {
                var json = (typeof response.body === 'string' ? JSON.parse(response.body) : response.body);
                messages = json.data;
                done();
            }

        });


    });

    it('list messages', function () {

        return expect(messages[0].body).equals('Francisco caravana...');

    });

});