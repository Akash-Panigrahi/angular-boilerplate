import { TestBed } from '@angular/core/testing';

import { ChangeToNoSortStorageService } from './change-to-no-sort-state.service';

describe('ChangeToNoSortStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeToNoSortStorageService = TestBed.get(ChangeToNoSortStorageService);
    expect(service).toBeTruthy();
  });
});
