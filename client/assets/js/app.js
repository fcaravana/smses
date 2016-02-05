/**
 * Angular.
 */
define(function () {

    'use strict';

    /* module */
    var app = angular.module('mobileMessagesApp', ['ngRoute', 'pascalprecht.translate']);
    
    /* config */
    app.constant('config', {
        messagesService: 'http://localhost:8080/twilio/messages/{FIRST_NUMBER}/{SECOND_NUMBER}/',
        refreshTime: 20000,
        messagesInterval: null
    });

    /* routes */
    app.config(['$routeProvider', function (routeProvider) {
        routeProvider.
                when('/messages', {
                    templateUrl: 'assets/js/app/components/events-list/events-list.html',
                    controller: 'MessagesListCtrl'
                }).
                when('/error/:message', {
                    templateUrl: 'assets/js/app/shared/error/error.html',
                    controller: 'ErrorCtrl'
                }).
                otherwise({
                    redirectTo: '/messages'
                });
    }]);

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

    return app;

});