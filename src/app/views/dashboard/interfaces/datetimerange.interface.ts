import { Moment } from 'moment';

export type MomentRange = [Moment, Moment];

export interface DatetimerangeData {
    dateTimeRange: MomentRange;
    ranges: Map<string, MomentRange>;
}

export interface DatetimerangeOverlayConfig {
    el: HTMLElement;
    data: DatetimerangeData;
}
