define(['app'], function (app) {

    'use strict';

    app.directive('myLoading', [
        '$http',
        function (http) {
            return {
                restrict: 'A',
                link: function (scope, elm, attrs) {

                    scope.isLoading = function () {
                        return (http.pendingRequests.length > 0);
                    };

                    scope.$watch(scope.isLoading, function (value) {

                        if (value) {
                            elm.show();
                        } else {
                            elm.hide();
                        }

                    });

                }
            };
        }
    ]);
});