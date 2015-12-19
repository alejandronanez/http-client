import {join} from 'path';
import {APP_DEST, APP_SRC, ENV} from '../config';

export = function buildConfigDev(gulp, plugins) {
    var ngConstant = require('gulp-ng-constant');

    return function () {
        var config = require('../../src/config.json');
        return ngConstant({
            name: 'app.config',
            wrap: 'commonjs',
            constants: config[ENV],
            stream: true
        })
            .pipe(plugins.concat('app.config.js'))
            .pipe(gulp.dest(join(APP_SRC, 'app')));
    };
}