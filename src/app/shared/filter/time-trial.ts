import * as moment from 'moment';
import 'moment-duration-format';

export default function() {
    return function(time) {
        return moment.duration(time, "milliseconds").format('m:ss.SSS');
    }
};
