import moment from 'moment';
import LangHelper from "../../../lib/langHelper";

export default {
    months: [
        LangHelper.getSingleResource('Jan'), LangHelper.getSingleResource('Feb'),
        LangHelper.getSingleResource('Mar'), LangHelper.getSingleResource('Apr'),
        LangHelper.getSingleResource('May'), LangHelper.getSingleResource('Jun'),
        LangHelper.getSingleResource('Jul'), LangHelper.getSingleResource('Aug'),
        LangHelper.getSingleResource('Sep'), LangHelper.getSingleResource('Oct'),
        LangHelper.getSingleResource('Nov'), LangHelper.getSingleResource('Dec')
    ],

    weekdays: [
        LangHelper.getSingleResource('Su'), LangHelper.getSingleResource('Mo'),
        LangHelper.getSingleResource('Tu'), LangHelper.getSingleResource('We'),
        LangHelper.getSingleResource('Th'), LangHelper.getSingleResource('Fr'),
        LangHelper.getSingleResource('Sa')
    ]
}