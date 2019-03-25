import { TestBed } from '@angular/core/testing';

import { DatetimerangeOverlayService } from './datetimerange-overlay.service';

describe('DatetimerangeOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatetimerangeOverlayService = TestBed.get(DatetimerangeOverlayService);
    expect(service).toBeTruthy();
  });
});
