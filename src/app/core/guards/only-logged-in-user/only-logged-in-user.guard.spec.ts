import { TestBed } from '@angular/core/testing';

import { OnlyLoggedInUserGuard } from './only-logged-in-user.guard';

describe('OnlyLoggedInUserGuard', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: OnlyLoggedInUserGuard = TestBed.get(OnlyLoggedInUserGuard);
        expect(service).toBeTruthy();
    });
});
