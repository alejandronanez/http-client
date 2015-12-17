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

gulp.task('postinstall', done =>
    runSequence(
        'clean',
        'npm.prune',
        done));
