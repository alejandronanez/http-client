var app = angular.module('app');

app.controller('nexusCtrl', [
    '$scope',
    '$stateParams',
    '$interval',
    'api',
    'bungie',
    'consts',
    
    function ($scope, $stateParams, $interval, api, bungie, consts) {
        var previousActivityHash = null;
        
        var load = function() {
            bungie
                .getAccount($scope.player.membershipType, $scope.player.membershipId, true)
                .then(function (result) {
                    $scope.character = result.data.Response.data.characters[0];
                    $scope.characterDefs = result.data.Response.definitions;
                    
                    previousActivityHash = $scope.character.characterBase.currentActivityHash;
                    
                    return bungie.getActivityHistory(
                        $scope.player.membershipType,
                        $scope.player.membershipId,
                        $scope.character.characterBase.characterId,
                        5,
                        0
                    );
                })
                .then(function (result) {
                    $scope.mode = result.data.Response.data.activities[0].activityDetails.mode;
                    $scope.modeName = consts.modes[$scope.mode];
                    $scope.modeIcon = consts.modeIcons[$scope.mode];
                    
                    $scope.activities = result.data.Response.data.activities;
                    $scope.lastActivity = $scope.activities.shift();
                    
                    return api.getFireteam($scope.mode, $scope.player.membershipId)
                })
                .then(function (result) {
                    $scope.fireteam = result.data;
                });;
                
        };
        
        var init = function() {
            bungie
                .searchForPlayer($stateParams.platform, $stateParams.name)
                .then(function (result) {
                    var previousActivityHash;
                            
                    $scope.player = result.data.Response[0];
                    
                    // interval is done here to ensure initialization
                    $interval(function() {
                        bungie
                            .getAccount($scope.player.membershipType, $scope.player.membershipId)
                            .then(function (result) {
                                // verify we've loaded
                                if (previousActivityHash === null) {
                                    return;
                                }
                                
                                var currentActivityHash = result.data.Response.data.characters[0].characterBase.currentActivityHash;
                                
                                if (previousActivityHash != currentActivityHash) {
                                    previousActivityHash = currentActivityHash;
                                }
                            });;
                    }, 60000);
                    
                    load();
                });
        };
        
        init();
    }
]);