import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(private _http: HttpClient) { }

    findLessons(
        courseId: number,
        filter = '',
        sortOrder = 'asc',
        pageNumber = 0,
        pageSize = 3): Observable<Lesson[]> {

        return this._http.get('/api/lesson')
    }
}
