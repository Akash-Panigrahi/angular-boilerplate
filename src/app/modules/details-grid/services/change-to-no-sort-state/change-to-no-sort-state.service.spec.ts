import { TestBed } from '@angular/core/testing';

import { ChangeToNoSortStateService } from './change-to-no-sort-state.service';

describe('ChangeToNoSortStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeToNoSortStateService = TestBed.get(ChangeToNoSortStateService);
    expect(service).toBeTruthy();
  });
});
