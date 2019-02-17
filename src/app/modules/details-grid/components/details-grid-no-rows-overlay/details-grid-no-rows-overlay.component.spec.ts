import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGridNoRowsOverlayComponent } from './details-grid-no-rows-overlay.component';

describe('DetailsGridNoRowsOverlayComponent', () => {
  let component: DetailsGridNoRowsOverlayComponent;
  let fixture: ComponentFixture<DetailsGridNoRowsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsGridNoRowsOverlayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGridNoRowsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
