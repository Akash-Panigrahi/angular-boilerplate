import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTableLengthComponent } from './report-table-length.component';

describe('ReportTableLengthComponent', () => {
  let component: ReportTableLengthComponent;
  let fixture: ComponentFixture<ReportTableLengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTableLengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTableLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
