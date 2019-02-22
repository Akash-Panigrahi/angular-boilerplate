import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from '../cache/cache.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Injectable()
export class LogoutService {

    constructor(
        private _router: Router,
        private _storage: StorageService
    ) { }

    logout() {

        // clear the storage
        this._storage.clear();

        // clear the cache
        CacheService.clear();

        // redirect to '/login' which will then redirect to login page
        this._router.navigateByUrl('/login');
    }
}
