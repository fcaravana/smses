/**
 * Angular.
 */
define(function () {

    'use strict';

    /* module */
    var app = angular.module('smsesApp', ['ngRoute', 'pascalprecht.translate']);

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