import * as gulp from 'gulp';
import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as slash from 'slash';
import * as _runSequence from 'run-sequence';
import {readdirSync, existsSync, lstatSync} from 'fs';
import {join} from 'path';
import {APP_BASE, APP_DEST, ENV, TOOLS_DIR} from '../config';

const TASKS_PATH = join(TOOLS_DIR, 'tasks');

export function task(taskname: string, option?: string) {
    util.log('Loading task', chalk.yellow(taskname, option || ''));
    return require(join('..', 'tasks', taskname))(gulp, gulpLoadPlugins(), option);
}

export function transformPath(plugins, env) {
    return function (filepath) {
        filepath = ENV === 'prod' ? filepath.replace(`/${APP_DEST}`, '') : filepath;
        arguments[0] = join(APP_BASE, filepath);
        return slash(plugins.inject.transform.apply(plugins.inject.transform, arguments));
    };
}

export function runSequence(...sequence: any[]) {
    let tasks = [];
    let _sequence = sequence;
    sequence.pop();

    scanDir(TASKS_PATH, taskname => tasks.push(taskname));

    sequence.forEach(task => {
        if (tasks.indexOf(task) > -1) { registerTask(task); }
    });

    return _runSequence(..._sequence);
}

// ----------
// Private.

function registerTask(taskname: string, filename?: string, option: string = ''): void {
    gulp.task(taskname, task(filename || taskname, option));
}

// TODO: add recursive lookup ? or enforce pattern file + folder (ie ./tools/utils & ./tools/utils.ts )
function scanDir(root: string, cb: (taskname: string) => void) {
    if (!existsSync(root)) return;

    walk(root);

    function walk(path) {
        let files = readdirSync(path);
        for (let i = 0; i < files.length; i += 1) {
            let file = files[i];
            let curPath = join(path, file);
            // if (lstatSync(curPath).isDirectory()) { // recurse
            //   path = file;
            //   walk(curPath);
            // }
            if (lstatSync(curPath).isFile() && /\.ts$/.test(file)) {
                let taskname = file.replace(/(\.ts)/, '');
                cb(taskname);
            }
        }
    }
}