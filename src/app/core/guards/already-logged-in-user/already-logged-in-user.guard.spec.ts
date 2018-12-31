import { TestBed, async, inject } from '@angular/core/testing';

import { AlreadyLoggedInUserGuard } from './already-logged-in-user.guard';

describe('AlreadyLoggedInUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlreadyLoggedInUserGuard]
    });
  });

  it('should ...', inject([AlreadyLoggedInUserGuard], (guard: AlreadyLoggedInUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
