import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridNoRowsOverlayComponent } from './ag-grid-no-rows-overlay.component';

describe('AgGridNoRowsOverlayComponent', () => {
  let component: AgGridNoRowsOverlayComponent;
  let fixture: ComponentFixture<AgGridNoRowsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGridNoRowsOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridNoRowsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
