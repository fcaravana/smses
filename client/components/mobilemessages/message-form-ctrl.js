define(['app'], function (app) {

    'use strict';

    app.controller('MessageFormCtrl', [
        '$rootScope',
        '$scope',
        '$http',
        'config',
        function (rootScope, scope, http, config) {

            /* phone numbers */
            var firstNumber = encodeURIComponent($('#chatbox').data('first-number'));
            var secondNumber = encodeURIComponent($('#chatbox').data('second-number'));

            /* send message route */
            var url = (config.sendMessageService.replace('{FIRST_NUMBER}', firstNumber)).replace('{SECOND_NUMBER}', secondNumber);

            /* message */
            scope.message = null;

            /* error sending the message */
            var errorWithoutAccess = function (res) {
                $('#formMessage').show();
                console.log("Without api access!");
            };

            /* message form submit */
            scope.submit = function () {

                $('#formMessage').hide();

                url = url.replace('{MESSAGE}', encodeURIComponent(scope.message));

                http({
                    method: 'GET',
                    url: url,
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