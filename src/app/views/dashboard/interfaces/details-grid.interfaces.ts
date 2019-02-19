import { DetailsTableSortDirection } from '../enums/details-grid.enums';

export interface DetailsTableData {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    date: string;
    time: string;
}

export interface DetailsGridInfo {
    from: number;
    to: number;
    total: number;
    filteredFrom: number;
}

export interface DetailsGridRequest {
    start: number;
    length: number;
    search: string;
    sort: DetailsTableSortEvent;
}

export interface DetailsGridResponse {
    data: DetailsTableData[];
    info: DetailsGridInfo;
}

export interface DetailsTableSortEvent {
    key: string;
    direction: DetailsTableSortDirection;
}
