import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTableSearchComponent } from './details-table-search.component';

describe('DetailsTableSearchComponent', () => {
  let component: DetailsTableSearchComponent;
  let fixture: ComponentFixture<DetailsTableSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTableSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTableSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
