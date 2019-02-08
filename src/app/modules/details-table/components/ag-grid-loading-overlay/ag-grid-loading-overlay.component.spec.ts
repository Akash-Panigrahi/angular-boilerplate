import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridLoadingOverlayComponent } from './ag-grid-loading-overlay.component';

describe('AgGridLoadingOverlayComponent', () => {
  let component: AgGridLoadingOverlayComponent;
  let fixture: ComponentFixture<AgGridLoadingOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridLoadingOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridLoadingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
