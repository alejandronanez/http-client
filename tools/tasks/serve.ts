import * as browserSync from 'browser-sync';
import * as historyApiFallback from 'connect-history-api-fallback';
import {join} from 'path';
import {APP_BASE, APP_DEST} from '../config';
import {PORT} from "../config";

export = function serveDev(gulp, plugins) {
    return function () {
        var serve = browserSync.create();

        serve.init({
            port: PORT,
            server: {
                baseDir: APP_DEST,
                middleware: [
                    historyApiFallback()
                ],
                routes: {
                    '/': './src',
                    '/jspm.config.js': './jspm.config.js',
                    '/jspm_packages': './jspm_packages'
                }
            }
        });
    };
}
