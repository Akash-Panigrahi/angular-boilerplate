import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTableLengthComponent } from './details-table-length.component';

describe('DetailsTableLengthComponent', () => {
  let component: DetailsTableLengthComponent;
  let fixture: ComponentFixture<DetailsTableLengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTableLengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTableLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
