import * as moment from 'moment';
import * as $ from 'jquery';
import * as angular from 'angular';

import * as Highcharts from 'highcharts';

// makes highcharts available globally
window.Highcharts = Highcharts;

import 'bootstrap';

// config
import '../app.config';

// these imports just load the files and are not called in this script
import 'angulartics';
import 'angulartics-google-analytics';
import 'angular-animate';
import 'angular-gettext';
import 'angular-filter';
import 'angular-loading-bar';
import 'angular-sanitize';
import 'angular-toastr';
import 'angular-tooltips';
import 'angular-ui-router';
import 'angularjs-datepicker';
import 'highcharts-ng';
import 'ng-smooth-scroll';
import 'ngstorage';
import 'ui-select';

// router
import routes from './routes';

import bungieInterceptor from './shared/interceptor/bungie';

// shared filters
import ago from './shared/filter/ago';
import timeTrial from './shared/filter/time-trial';

// shared services
import api from './shared/service/api';
import bungie from './shared/service/bungie';
import charts from './shared/service/charts';
import consts from './shared/service/consts';
import gamedata from './shared/service/gamedata';
import util from './shared/service/util';

// charts
import kd from './shared/chart/kd';
import popularity from './shared/chart/popularity';
import profileElo from './shared/chart/profile-elo';
import subclassKd from './shared/chart/subclass-kd';
import subclassWinRate from './shared/chart/subclass-win-rate';
import weaponBar from './shared/chart/weapon-bar';
import weaponSpline from './shared/chart/weapon-spline';

// component services
import leaderboardApi from './component/leaderboard/leaderboard.api';
import srlApi from './component/srl/srl.api';

// component controllers
import homeController from './component/home/home.controller';
import leaderboardController from './component/leaderboard/leaderboard.controller';
import layoutController from './component/layout/layout.controller';
import profileController from './component/profile/profile.controller';
import searchController from './component/search/search.controller';
import srlController from './component/srl/srl.controller';
import subclassController from './component/subclass/subclass.controller';

var app = angular.module(
    'app',
    [
        'app.config',

        'ngAnimate',
        'ngSanitize',
        'ngStorage',

        'angular.filter',
        'angular-loading-bar',

        'angulartics',
        'angulartics.google.analytics',

        'gettext',

        'highcharts-ng',

        '720kb.datepicker',
        '720kb.tooltips',

        'smoothScroll',
        'toastr',

        'ui.router',
        'ui.select'
    ]
);

app.config(routes);
app.factory('bungieInterceptor', bungieInterceptor);

// shared services
app.service('api', api);
app.service('bungie', bungie);
app.service('charts', charts);
app.service('consts', consts);
app.service('gamedata', gamedata);
app.service('util', util);

// shared filters
app.filter('ago', ago);
app.filter('timeTrial', timeTrial);

// charts
app.factory('chart-kd', kd);
app.factory('chart-popularity', popularity);
app.factory('chart-profile-elo', profileElo);
app.factory('chart-subclass-kd', subclassKd);
app.factory('chart-subclass-win-rate', subclassWinRate);
app.factory('chart-weapon-bar', weaponBar);
app.factory('chart-weapon-spline', weaponSpline);

// component services
app.service('leaderboardApi', leaderboardApi);
app.service('srlApi', srlApi);

// component controllers
app.controller('homeCtrl', homeController);
app.controller('layoutCtrl', layoutController);
app.controller('leaderboardCtrl', leaderboardController);
app.controller('profileCtrl', profileController);
app.controller('searchCtrl', searchController);
app.controller('srlCtrl', srlController);
app.controller('subclassCtrl', subclassController);

app
    .config([
        'toastrConfig',
        '$httpProvider',

        function (toastrConfig, $httpProvider) {
            angular.extend(toastrConfig, {
                progressBar: true,
                tapToDismiss: true,
                timeOut: 2000
            });

            $httpProvider.interceptors.push('bungieInterceptor');
        }
    ])
    .run([
        '$localStorage',
        '$rootScope',
        '$state',
        '$log',
        '$location',
        'consts',
        'gettextCatalog',

        function ($localStorage, $rootScope, $state, $log, $location, consts, gettextCatalog) {
            var locale = $localStorage.locale ? $localStorage.locale : 'en';
            var regex = new RegExp("^\/(" + Object.keys(consts.languages).join('|') + ")\/");
            var match = $location.path().match(regex);

            if (!match) {
                $log.debug('no url locale set, redirecting to: ' + locale);
                $state.go('app.home', {locale: locale});
            } else if (locale !== match[1]) {
                $log.debug('selected locale does not match url, updating url to match...');
                locale = match[1];
            }

            gettextCatalog.setCurrentLanguage(locale);
            moment.locale(locale);

            $rootScope.$on('$stateNotFound', function (event, state) {
                $log.error('state not found');
                $log.error(state);
            });

            $rootScope.$on('$stateChangeError', function (event, err) {
                $log.error(err);
            });

            $rootScope.$on('$stateChangeStart', function (event, toState) {
                $rootScope.apiError = false;

                if (toState.title) {
                    $rootScope.title = gettextCatalog.getString(toState.title) + ' - Guardian.gg';
                } else {
                    $rootScope.title = gettextCatalog.getString(
                        'Guardian.gg - Advanced Destiny Stats, Profiles and Leaderboards'
                    );
                }
            });
        }
    ]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ['app']);
});
