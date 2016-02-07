define(['app'], function (app) {

    'use strict';

    app.controller('MessageFormCtrl', [
        '$scope',
        '$http',
        'config',
        function (scope, http, config) {

            scope.message = null;

            var errorWithoutAccess = function (response) {
                $('#formMessage').show();
                console.log("Without api access!");
            };

            scope.submit = function () {

                $('#formMessage').hide();

                var firstNumber = encodeURIComponent($('#chatbox').data('first-number'));
                var secondNumber = encodeURIComponent($('#chatbox').data('second-number'));

                var url = (config.sendMessageService.replace('{FIRST_NUMBER}', firstNumber)).replace('{SECOND_NUMBER}', secondNumber);
                url = url.replace('{MESSAGE}', encodeURIComponent(scope.message));

                http({
                    method: 'GET',
                    url: url,
                    cache: false
                }).success(function (response) {
                    scope.message = null;
                    $('#formMessage').show();
                }).error(errorWithoutAccess);

            };

        }
    ]);

});