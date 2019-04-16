import { Moment } from 'moment';

export type Moment = Moment;
export type MomentRange = [Moment, Moment];

export interface DatetimerangeData {
    dateTimeRange: MomentRange;
    ranges: Map<string, MomentRange>;
    max: Date;
}

export interface DatetimerangeOverlayConfig {
    el: HTMLElement;
    data: DatetimerangeData;
}
