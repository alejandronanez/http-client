import * as async from 'async';
import * as del from 'del';
import {APP_DEST} from '../config';

export = function clean(gulp, plugins, option) {
    return function (done) {

        switch(option) {
            case 'all'    : cleanAll(done);     break;
            case 'dist'   : cleanDist(done);    break;
            default: done();
        }

    };
};

function cleanAll(done) {
    async.parallel([
        cleanDist
    ], done);
}
function cleanDist(done) {
    del(APP_DEST, done);
}
