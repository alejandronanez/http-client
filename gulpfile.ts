/// <reference path="tools/typings/tsd/tsd.d.ts" />
/// <reference path="tools/typings/connect-history-api-fallback.d.ts" />
/// <reference path="tools/typings/gulp-load-plugins.d.ts" />
/// <reference path="tools/typings/slash.d.ts" />

import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {loadTasks, task} from './tools/utils';

// loads all tasks from tools/tasks
loadTasks();

// (override)
gulp.task('clean',       task('clean', 'all'));
gulp.task('clean.dist',  task('clean', 'dist'));

gulp.task('build.dev', done =>
    runSequence('clean.dist',
        'tslint',
        'build.less.dev',
        'build.img.dev',
        'build.js.dev',
        'build.index',
        done));

gulp.task('build.dev.watch', done =>
    runSequence('build.dev',
        'watch.dev',
        done));

gulp.task('postinstall', done =>
    runSequence(
        'clean',
        'npm.prune',
        done));
