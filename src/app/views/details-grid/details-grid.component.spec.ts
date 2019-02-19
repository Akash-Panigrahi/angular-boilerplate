import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGridComponent } from './details-grid.component';

describe('DetailsGridComponent', () => {
  let component: DetailsGridComponent;
  let fixture: ComponentFixture<DetailsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsGridComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
