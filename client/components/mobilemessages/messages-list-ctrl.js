define(['app'], function (app) {

    'use strict';

    app.controller('MessagesListCtrl', [
        '$scope',
        '$interval',
        'messages',
        'config',
        function (scope, interval, messages, config) {

            var firstNumber = $('#chatbox').data('first-number');
            var secondNumber = $('#chatbox').data('second-number');
            
            scope.computeCssClass = function (number) {
                var className = 'arrow-box-left';
                
                if (number === firstNumber) {
                    className = 'arrow-box-right';
                } 
                
                return className;
            };

            scope.setData = function (messages) {
                scope.messages = messages;
                $('#chatmessages').show(function () {
                    $(this).scrollTop($('#chatmessages')[0].scrollHeight);
                });
            };

            scope.getData = function () {
                messages.list(scope.setData);
            };

            scope.getData();

            interval.cancel(config.messagesInterval);
            config.messagesInterval = interval(scope.getData, config.refreshTime);

        }
    ]);

});