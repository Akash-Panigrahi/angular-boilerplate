import { TestBed } from '@angular/core/testing';

import { FormatTimeService } from './format-time.service';

describe('FormatTimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormatTimeService = TestBed.get(FormatTimeService);
    expect(service).toBeTruthy();
  });
});
