var app = angular.module('app');

app.directive('fireteamList', [
    function() {
        return {
            restrict: 'A',
            scope: {
                fireteamList: '='
            },
            templateUrl: 'shared/directive/fireteam-list/fireteam-list.html'
        };
    }
]);
