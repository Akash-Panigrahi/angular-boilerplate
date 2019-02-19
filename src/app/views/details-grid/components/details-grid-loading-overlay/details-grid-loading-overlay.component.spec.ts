import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGridLoadingOverlayComponent } from './details-grid-loading-overlay.component';

describe('DetailsGridLoadingOverlayComponent', () => {
  let component: DetailsGridLoadingOverlayComponent;
  let fixture: ComponentFixture<DetailsGridLoadingOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsGridLoadingOverlayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGridLoadingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
