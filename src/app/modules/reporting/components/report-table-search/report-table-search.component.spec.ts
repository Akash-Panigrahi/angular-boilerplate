import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTableSearchComponent } from './report-table-search.component';

describe('ReportTableSearchComponent', () => {
  let component: ReportTableSearchComponent;
  let fixture: ComponentFixture<ReportTableSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTableSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
