define(['app'], function (app) {

    'use strict';

    app.service('messages', [
        '$http',
        '$location',
        'config',
        function (http, location, config) {

            var firstNumber = encodeURIComponent($('#chatbox').data('first-number'));
            var secondNumber = encodeURIComponent($('#chatbox').data('second-number'));

            var url = (config.messagesService.replace('{FIRST_NUMBER}', firstNumber)).replace('{SECOND_NUMBER}', secondNumber);
            
            var errorWithoutAccess = function (response) {
                location.path("/error/" + "Without api access!");
            };

            var getData = function (callback) {
                http({
                    method: 'GET',
                    url: url,
                    cache: false
                }).success(function (messages) {
                    console.log(messages);
                    callback(messages.data);
                }).error(errorWithoutAccess);
            };

            var self = {list: getData};

            return self;

        }]);

});