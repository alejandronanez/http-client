/// <reference path="tools/typings/tsd/tsd.d.ts" />
/// <reference path="tools/typings/connect-history-api-fallback.d.ts" />
/// <reference path="tools/typings/gulp-load-plugins.d.ts" />
/// <reference path="tools/typings/slash.d.ts" />

import * as gulp from 'gulp';
import {runSequence, task} from './tools/utils';

gulp.task('build.dev', done => runSequence(
    'clean',
    'tslint',
    'build.config',
    'build.less.dev',
    'build.index',
    done
));

gulp.task('serve', done => runSequence('serve', done));

gulp.task('build.dev.watch', done => runSequence(
    'build.dev',
    'watch.dev',
    done
));

gulp.task('postinstall', done => runSequence(
    'clean',
    'npm.prune',
    done
));
