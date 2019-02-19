import { TestBed, async, inject } from '@angular/core/testing';

import { ModuleAlreadyLoadedGuard } from './module-already-loaded.guard';

describe('ModuleAlreadyLoadedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleAlreadyLoadedGuard]
    });
  });

  it('should ...', inject([ModuleAlreadyLoadedGuard], (guard: ModuleAlreadyLoadedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
