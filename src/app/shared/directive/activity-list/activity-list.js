var app = angular.module('app');

app.directive('activityList', [
    function() {
        return {
            restrict: 'A',
            scope: {
                activityList: '='
            },
            templateUrl: 'shared/directive/activity-list/activity-list.html'
        };
    }
]);
