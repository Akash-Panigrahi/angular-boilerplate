import { TestBed } from '@angular/core/testing';

import { DetailsGridRequestService } from './details-grid-request.service';

describe('DetailsGridRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailsGridRequestService = TestBed.get(DetailsGridRequestService);
    expect(service).toBeTruthy();
  });
});
