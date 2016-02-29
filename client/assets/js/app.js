/**
 * Angular.
 */
define(function () {

    'use strict';

    /* module */
    var app = angular.module('mobileMessagesApp', ['ngRoute', 'pascalprecht.translate']);
    
    /* config */
    app.constant('config', {
        messagesService: 'http://localhost:8080/twilio/messages',
        sendMessageService: 'http://localhost:8080/twilio/sendmessage',
        refreshTime: 10000,
        messagesInterval: null
    });

    /* translations */
    app.config([
        '$translateProvider',
        '$translatePartialLoaderProvider',
        function (translateProvider, translatePartialLoaderProvider) {
            translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: 'shared/translations/{lang}/{part}.json'
            });

            translateProvider.useSanitizeValueStrategy('escape');
            translateProvider.preferredLanguage('en');
            translatePartialLoaderProvider.addPart('main');
        }
    ]);

    /* routes */
    app.config(['$routeProvider', function (routeProvider) {
        routeProvider.
                when('/messages', {
                    templateUrl: 'components/mobilemessages/messages-list.html',
                    controller: 'MessagesListCtrl'
                }).
                otherwise({
                    redirectTo: '/messages'
                });
    }]);

    return app;

});