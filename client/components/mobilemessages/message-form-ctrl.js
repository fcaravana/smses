define(['app'], function (app) {

    'use strict';

    app.controller('MessageFormCtrl', [
        '$rootScope',
        '$scope',
        '$http',
        'config',
        function (rootScope, scope, http, config) {

            /* phone numbers */
            var firstNumber = $('#chatbox').data('first-number');
            var secondNumber = $('#chatbox').data('second-number');

            /* send message route */
            var url = config.sendMessageService;

            /* message */
            scope.message = null;

            /* error sending the message */
            var errorWithoutAccess = function (res) {
                $('#formMessage').show();
                alert("Could not send the message!");
            };

            /* message form submit */
            scope.submit = function () {

                $('#formMessage').hide();

                http({
                    method: 'POST',
                    url: url,
                    params: {number1: firstNumber, number2: secondNumber, message: scope.message},
                    cache: false
                }).success(function (res) {

                    scope.message = null;
                    rootScope.$broadcast('listMessages', {});
                    $('#formMessage').show();

                }).error(errorWithoutAccess);

            };

        }
    ]);

});