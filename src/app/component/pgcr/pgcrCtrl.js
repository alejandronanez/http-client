var app = angular.module('app');

app.controller('pgcrCtrl', [
    '$rootScope',
    '$scope',
    '$stateParams',
    'consts',

    function ($rootScope, $scope, $stateParams, consts) {
        $scope.instanceId = $stateParams.instanceId;
        $rootScope.title = 'Carnage Report - Guardian.gg';

        $scope.onComplete = function (pgcr) {
            $rootScope.title = 
                '#[' + $stateParams.instanceId + '] ' +
                pgcr.getDefinitions().activities[pgcr.getDetails().referenceId].activityName +
                ' (' + consts.modes[pgcr.getMode()] + ') - Carnage Report - Guardian.gg';    
        };
    }
]);
