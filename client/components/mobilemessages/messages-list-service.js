define(['app'], function (app) {

    'use strict';

    app.service('messages', [
        '$http',
        'config',
        function (http, config) {

            var firstNumber = $('#chatbox').data('first-number');
            var secondNumber = $('#chatbox').data('second-number');

            var url = config.messagesService;

            var errorWithoutAccess = function (response) {
                console.log("Without api access!");
            };

            var getData = function (callback) {
                http({
                    method: 'GET',
                    url: url,
                    params: {number1: firstNumber, number2: secondNumber},
                    cache: false
                }).success(function (messages) {
                    callback(messages.data);
                }).error(errorWithoutAccess);
            };

            var self = {list: getData};

            return self;

        }]);

});