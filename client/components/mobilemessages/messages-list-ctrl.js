define(['app'], function (app) {

    'use strict';

    app.controller('MessagesListCtrl', [
        '$scope',
        '$interval',
        '$timeout',
        'messages',
        'config',
        function (scope, interval, timeout, messages, config) {

            /* set twilio number */
            var firstNumber = $('#chatbox').data('first-number');

            /* set different classes for the from and to numbers */
            scope.computeCssClass = function (number) {
                var className = 'arrow-box left-arrow white-box';

                if (number === firstNumber) {
                    className = 'arrow-box right-arrow blue-box';
                }

                return className;
            };

            /* scroll to the bottom of the messages box */
            var scrollToBottom = function () {
                $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
            };

            /* set messages */
            scope.setData = function (messages) {
                scope.messages = messages;
                timeout(scrollToBottom, 1000);
            };

            /* get data from service */
            scope.getData = function () {
                messages.list(scope.setData);
            };

            /* get messages from service */
            scope.getData();

            /* read messages in a interval of time */
            interval.cancel(config.messagesInterval);
            config.messagesInterval = interval(scope.getData, config.refreshTime);

            /* read messages triggered by other */
            scope.$on('listMessages', function (event, args) {
                scope.getData();
            });

        }
    ]);

});