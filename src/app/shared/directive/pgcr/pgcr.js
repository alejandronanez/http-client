var app = angular.module('app');

app.directive('pgcr', [
    '$timeout',
    'consts',
    
    function($timeout, consts) {
        return {
            restrict: 'A',
            scope: {
                pgcr: '=',
                complete: '='
            },
            templateUrl: 'shared/directive/pgcr/pgcr.html',
            controller: [
                '$scope',
                'pgcrFactory',
                
                function ($scope, pgcrFactory) {
                    $scope.loading = {pgcr: true};
                    $scope.teamDefs = consts.teams;
                    $scope.modeDefs = consts.modes;
                    
                    var pgcr = new pgcrFactory();
                    
                    pgcr.load($scope.pgcr)
                        .then(function() {
                            $scope.statDefs = pgcr.getStatDefinitions();
                            $scope.definitions = pgcr.getDefinitions();
                            $scope.mode = pgcr.getMode();
                            $scope.teams = pgcr.getTeams();
                            $scope.details = pgcr.getDetails();
                            $scope.period = pgcr.getPeriod();
                            $scope.id = $scope.pgcr;

                            $timeout(function() {
                                $('.player-row').mouseenter(function(e) {
                                    $(this).addClass('active');
                                }).mouseleave(function(e) {
                                    $(this).removeClass('active');
                                }).bind('click', function(e) {
                                    $(this).parent().toggleClass('open');
                                    $timeout(function() {
                                        window.gggTips.run();
                                    });
                                });
                            });

                            $scope.loading.pgcr = false;
                            
                            if ($scope.complete) {
                                $scope.complete(pgcr);
                            }
                        });
                }
            ]
        };
    }
]);
