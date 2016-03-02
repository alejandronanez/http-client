var app = angular.module('app');

app.service('bungie', [
    '$q',
    '$http',
    'gettextCatalog',
    'consts',
    'util',

    function ($q, $http, gettextCatalog, consts, util) {
        return new function () {
            var self = this;
            var BASE_URL = '//proxy.guardian.gg/Platform/Destiny';
            var ENDPOINTS = {
                statDefinitions: '/Stats/Definition/?lc={locale}',
                account: '/{platform}/Account/{membershipId}/Summary/?definitions={defs}',
                inventory: '/{platform}/Account/{membershipId}/Character/{characterId}/Inventory/?definitions=true&lc={locale}',
                activityHistory: '/Stats/ActivityHistory/{platform}/{membershipId}/{characterId}/?mode={mode}&definitions=true&count=25&page={page}&lc={locale}',
                searchForPlayer: '/SearchDestinyPlayer/{platform}/{name}/',
                pgcr: '/Stats/PostGameCarnageReport/{instanceId}/?definitions=true&lc={locale}'
            };
            var statDefCache;

            this.getPgcr = function(instanceId) {
                return this.get(ENDPOINTS.pgcr, {
                    instanceId: instanceId,
                    locale: gettextCatalog.getCurrentLanguage()
                });
            };

            this.getStatDefinitions = function() {
                return $q(function(resolve, reject) {
                    if (statDefCache) {
                        resolve(statDefCache);
                    } else {
                        self.get(ENDPOINTS.statDefinitions, {
                            locale: gettextCatalog.getCurrentLanguage()
                        }).then(function(response) {
                            statDefCache = response;
                            resolve(response);
                        }, function(err) {
                            reject(err);
                        });
                    }
                });
            };

            this.searchForPlayer = function(platform, name) {
                return this.get(ENDPOINTS.searchForPlayer, {
                    platform: platform,
                    name: name
                });
            };

            this.getAccount = function(platform, membershipId, defs) {
                return this.get(ENDPOINTS.account, {
                    platform: platform,
                    membershipId: membershipId,
                    defs: defs ? 'true' : 'false'
                });
            };

            this.getInventory = function(platform, membershipId, characterId) {
                return this.get(ENDPOINTS.inventory, {
                    platform: platform,
                    membershipId: membershipId,
                    characterId: characterId,
                    locale: gettextCatalog.getCurrentLanguage()
                });
            };

            this.getActivityHistory = function(platform, membershipId, characterId, mode, page) {
                return this.get(ENDPOINTS.activityHistory, {
                    platform: platform,
                    membershipId: membershipId,
                    characterId: characterId,
                    mode: consts.customToBungieMode(mode),
                    page: page,
                    locale: gettextCatalog.getCurrentLanguage()
                });
            };

            this.get = function(endpoint, tokens) {
                return $http.get(BASE_URL + util.buildUrl(endpoint, tokens));
            };
        };
    }
]);
