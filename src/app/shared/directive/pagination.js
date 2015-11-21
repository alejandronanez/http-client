var app = angular.module('app');

app.directive('pagination', [
    function() {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                name: '=',
                callback: '='
            },
            controller: [
                '$scope',
                function($scope) {
                    $scope.load = function(page) {
                        $scope.page = page;

                        if ($scope.callback) {
                            $scope.callback(page);
                        } else {
                            console.log('No callback passed, offset: ' + page);
                        }
                    };

                    $scope.page     = $scope.data.page;
                    $scope.maxPages = Math.floor($scope.data.totalItems / $scope.data.pageCount);
                }
            ],
            templateUrl: 'directive/pagination.html'
        };
    }
]);
