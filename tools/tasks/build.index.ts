import {join} from 'path';
import {APP_SRC, APP_DEST, DEPENDENCIES, ENV} from '../config';
import {transformPath} from '../utils/tasks_tools';

export = function buildIndexDev(gulp, plugins) {
    return function () {
        return gulp.src(join(APP_SRC, 'index.html'))
            .pipe(inject('app'))
            .pipe(gulp.dest(APP_DEST));
    };


    function inject(name?: string) {
        return plugins.inject(gulp.src(getInjectablesDependenciesRef(name), { read: false }), {
            name,
            ignorePath: APP_DEST,
            transform: transformPath(plugins, 'dev')
        });
    }

    function getInjectablesDependenciesRef(name?: string) {
        return DEPENDENCIES
            .filter(dep => dep['inject'] && dep['inject'] === (name || true))
            .map(mapPath);
    }

    function mapPath(dep) {
        let prodPath = `${dep.dest}/${dep.src.split('/').pop()}`;
        return ('prod' === ENV ? prodPath : dep.src );
    }
};
