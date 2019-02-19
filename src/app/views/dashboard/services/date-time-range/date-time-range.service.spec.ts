import { TestBed } from '@angular/core/testing';

import { DateTimeRangeService } from './date-time-range.service';

describe('DateTimeRangeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateTimeRangeService = TestBed.get(DateTimeRangeService);
    expect(service).toBeTruthy();
  });
});
