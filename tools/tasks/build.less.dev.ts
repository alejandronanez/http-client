import {APP_DEST, LESS_FILE} from '../config';

export = function taskLess(gulp, plugins) {
    return function() {
        return gulp.src(LESS_FILE)
            .pipe(plugins.less().on('error', (err) => { console.error(err.message); }))
            .pipe(gulp.dest(APP_DEST));
    };
}
