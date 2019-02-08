export interface IDetailsTableData {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    date: string;
    time: string;
}

export interface IDetailsTableRequest {
    start: number;
    length: number;
    search: string;
    sort: ISortEvent;
}

export interface IDetailsTableResponse {
    data: IDetailsTableData[];
    info: {
        from: number,
        to: number,
        total: number,
    };
}

export interface ISortEvent {
    sortKey: string;
    sortDir: SortDir;
}

export enum SortDir {
    ASC = 1,
    DESC = -1,
    NONE = 0,
}
