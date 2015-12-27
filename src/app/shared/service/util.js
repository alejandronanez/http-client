var app = angular.module('app');

app.service('util', [
    'config',

    function (config) {
        return new function () {
            var urlRegex = /{(\w+)}/;

            /**
             * @see https://gist.github.com/mathewbyrne/1280286
             */
            this.slugify = function(str) {
                return str.toString().toLowerCase()
                    .replace(/\s+/g, '-')           // Replace spaces with -
                    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                    .replace(/^-+/, '')             // Trim - from start of text
                    .replace(/-+$/, '');            // Trim - from end of text
            };

            this.isMobile = {
                Android: function() {
                    return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                    return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
                },
                any: function() {
                    return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
                }
            };

            this.isNumeric = function (n) {
                return !isNaN(parseFloat(n)) && isFinite(n);
            };

            this.buildApiUrl = function (endpoint, tokens, params) {
                return this.buildUrl(config.api + '/' + endpoint, tokens) + this.encodeQueryParams(params);
            };

            this.encodeQueryParams = function(params) {
                var queryParams = '';

                if (params) {
                    queryParams = '?';
                    for (var prop in params) {
                        if (!params.hasOwnProperty(prop)) {
                            return;
                        }
                        queryParams += encodeURIComponent(prop) + '=' + encodeURIComponent(params[prop]) + '&';
                    }
                    queryParams = queryParams.substring(0, queryParams.length - 1);
                }

                return queryParams;
            };

            this.buildUrl = function (url, tokens) {
                var match;

                while (match = urlRegex.exec(url)) {
                    if (null == tokens[match[1]]) {
                        throw 'Missing "' + match[1] + '" for ' + url;
                    }
                    url = url.replace(match[0], tokens[match[1]]);
                }

                return url;
            };
        };
    }
]);
