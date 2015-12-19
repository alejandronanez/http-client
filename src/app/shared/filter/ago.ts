import * as moment from 'moment';

export default function() {
    return function(str) {
        return moment(str).fromNow();
    }
};
