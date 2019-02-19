import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGridSearchComponent } from './details-grid-search.component';

describe('DetailsGridSearchComponent', () => {
  let component: DetailsGridSearchComponent;
  let fixture: ComponentFixture<DetailsGridSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsGridSearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGridSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
