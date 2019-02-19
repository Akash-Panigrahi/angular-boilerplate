import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGridTableComponent } from './details-grid-table.component';

describe('DetailsGridTableComponent', () => {
  let component: DetailsGridTableComponent;
  let fixture: ComponentFixture<DetailsGridTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsGridTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
