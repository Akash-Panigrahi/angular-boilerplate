import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTableInfoComponent } from './report-table-info.component';

describe('ReportTableInfoComponent', () => {
  let component: ReportTableInfoComponent;
  let fixture: ComponentFixture<ReportTableInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTableInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
