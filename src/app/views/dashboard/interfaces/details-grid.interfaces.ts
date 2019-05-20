export interface DetailsGridRequest {
    start: number;
    length: number;
    search: string;
    sort_key: DetailsTableSortEvent['sort_key'];
    sort_direction: DetailsTableSortEvent['sort_direction'];
}

export interface DetailsGridResponse {
    data: any[];
    filtered: number;
    total: number;
}

export interface DetailsTableSortEvent {
    sort_key: string;
    sort_direction: DetailsTableSortDirection;
}

export enum DetailsTableSortDirection {
    ASC = 1,
    DESC = -1,
    NONE = 0,
}
