import {join} from 'path';
import {ASSET_SRC, CSS_DEST} from '../config';

export = function taskLess(gulp, plugins) {
    return function() {
        return gulp.src(join(ASSET_SRC, 'less', 'guardian.less'))
            .pipe(plugins.less().on('error', (err) => { console.error(err.message); }))
            .pipe(gulp.dest(CSS_DEST));
    };
}
