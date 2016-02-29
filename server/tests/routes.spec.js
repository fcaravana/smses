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

describe('Test server app routes.', function () {

    this.timeout(10000);
    
    var messages = null;
    var accurateNumbers = false;

    var twilioNumber = null;
    var twilioMobile = null;
    
    before(function (done) {

        var url = config.http.protocol + '://' + config.http.host + ':' + config.http.port;
        var path = '/twilio/messages?number1=' + encodeURIComponent(config.twilio.number) + '&number2=' + encodeURIComponent(config.twilio.mobile) + '/';

        unirest.get(url + path).end(function (response) {

            if (response.code === 200) {
                var json = (typeof response.body === 'string' ? JSON.parse(response.body) : response.body);

                messages = json.data;
                accurateNumbers = true;

                twilioNumber = config.twilio.number;
                twilioMobile = config.twilio.mobile;

                for (var key in messages) {
                    var msg = messages[key];

                    if (msg.to !== config.twilio.number && msg.to !== config.twilio.mobile) {
                        accurateNumbers = false;
                    } 
                    
                    if (msg.from !== config.twilio.number && msg.from !== config.twilio.mobile) {
                        accurateNumbers = false;
                    } 
                }

                done();
            }

        });


    });

    it('Testing if the body property have "Francisco caravana..." in the first position of the messages.', function () {

        return expect(messages[0].body).equals('Francisco caravana...');

    });

    it('Testing if the messages only have the two numbers +14103059206 and +351919253047 in the "to" and "from" properties.', function () {

        return expect(accurateNumbers).equals(true);

    });

});