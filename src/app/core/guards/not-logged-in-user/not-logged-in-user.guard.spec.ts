import { TestBed, async, inject } from '@angular/core/testing';

import { NotLoggedInUserGuard } from './not-logged-in-user.guard';

describe('NotLoggedInUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotLoggedInUserGuard]
    });
  });

  it('should ...', inject([NotLoggedInUserGuard], (guard: NotLoggedInUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
