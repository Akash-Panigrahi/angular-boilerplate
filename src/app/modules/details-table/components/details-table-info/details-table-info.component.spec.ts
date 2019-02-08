import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTableInfoComponent } from './details-table-info.component';

describe('DetailsTableInfoComponent', () => {
  let component: DetailsTableInfoComponent;
  let fixture: ComponentFixture<DetailsTableInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTableInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTableInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
