export interface IDataTableData {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
}

export interface IDataTableRequest {
    draw: number;
    start: number;
    length: number;
    search: {
        value: string;
        regex: boolean;
    };
    order: [
        {
            column: number;
            dir: 'asc' | 'desc';
        }
    ];
    columns: [
        {
            data: keyof IDataTableData;
            name: string;
            searchable: boolean;
            orderable: boolean;
            search: {
                value: string;
                regex: boolean;
            };
        }
    ];
}

export interface IDataTableResponse {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: IDataTableData[];
}
