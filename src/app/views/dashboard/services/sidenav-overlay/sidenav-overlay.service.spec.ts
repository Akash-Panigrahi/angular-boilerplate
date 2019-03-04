import { TestBed } from '@angular/core/testing';

import { SidenavOverlayService } from './sidenav-overlay.service';

describe('SidenavOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SidenavOverlayService = TestBed.get(SidenavOverlayService);
    expect(service).toBeTruthy();
  });
});
