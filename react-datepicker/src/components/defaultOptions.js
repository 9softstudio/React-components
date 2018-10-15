import moment from 'moment';
import LangHelper from "../../lib/langHelper";
import locale from "./utils/locale";
import { MomentFormat } from './constants';

const addRange = (rangeObj, name, start, end) => {
    rangeObj[LangHelper.getSingleResource(name)] = {
        startDate: start,
        endDate: end
    };
};

const addOneDay = (rangeObj, name, day, min, max) => {
    if (day >= min && day <= max) {
        addRange(rangeObj, name, day, day);
    }
};

const addDistanceDays = (rangeObj, name, start, end, min, max) => {
    if (!(max < start || end < min)) {
        addRange(rangeObj, name, start < min ? min : start, end > max ? max: end);
    }
};

export default {
    ranges: (today, min, max, limitMonths) => {
        today = !today ? moment() : (!moment.isMoment(today) ? moment(today, MomentFormat.default) : today);
        max = !max ? today : (!moment.isMoment(max) ? moment(max, MomentFormat.default) : max);
        min = !min ? today : (!moment.isMoment(min) ? moment(min, MomentFormat.default) : min);

        const range = {};

        if (today < min) {
            return range;
        }

        addOneDay(range, "Today", today, min, max);

        const yesterday = today.clone().add(-1, 'days');
        addOneDay(range, "Yesterday", yesterday, min, max);

        const startCurrentWeek = today.clone().startOf('week');
        const endCurrentWeek = today;
        addDistanceDays(range, "Currentweek", startCurrentWeek, endCurrentWeek, min, max);

        const startLastWeek = today.clone().subtract(1, 'week').startOf('week');
        const endLastWeek = startLastWeek.clone().add(6, 'days');
        addDistanceDays(range, "Lastweek", startLastWeek, endLastWeek, min, max);

        const startCurrentmonth = today.clone().startOf('month');
        const endCurrentmonth = today;
        addDistanceDays(range, "Currentmonth", startCurrentmonth, endCurrentmonth, min, max);

        const startLastmonth = today.clone().subtract(1, 'month').startOf('month');
        const endLastmonth = startLastmonth.clone().endOf('month');
        addDistanceDays(range, "Lastmonth", startLastmonth, endLastmonth, min, max);

        if (limitMonths && limitMonths > 1) {
            const startSincelastmonth = today.clone().subtract(1, 'month').startOf('month');
            const endSincelastmonth = today;
            addDistanceDays(range, "Sincelastmonth", startSincelastmonth, endSincelastmonth, min, max); 
        }

        return range;
    },

    locale: {
        applyLabel: LangHelper.getSingleResource("OK"),
        cancelLabel: LangHelper.getSingleResource("Cancel"),
        ...locale
    }
}