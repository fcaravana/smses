define(['app'], function (app) {

    'use strict';

    app.controller('MessagesListCtrl', [
        '$scope',
        '$interval',
        '$timeout',
        'messages',
        'config',
        function (scope, interval, timeout, messages, config) {

            var firstNumber = $('#chatbox').data('first-number');

            scope.computeCssClass = function (number) {
                var className = 'arrow-box left-arrow white-box';

                if (number === firstNumber) {
                    className = 'arrow-box right-arrow blue-box';
                }

                return className;
            };

            var scrollToBottom = function () {
                $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
            };

            scope.setData = function (messages) {
                scope.messages = messages;
                timeout(scrollToBottom, 1000);
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