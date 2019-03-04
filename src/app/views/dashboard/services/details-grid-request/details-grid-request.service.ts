import { Injectable } from '@angular/core';
import { DetailsGridRequest } from '../../interfaces/details-grid.interfaces';

@Injectable()
export class DetailsGridRequestService {
    initial(): DetailsGridRequest {
        return {
            start: 0,
            length: 5,
            search: '',
            sort: {
                key: 'id',
                direction: 1
            }
        };
    }
}
