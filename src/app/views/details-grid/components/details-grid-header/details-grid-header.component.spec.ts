import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGridHeaderComponent } from './details-grid-header.component';

describe('DetailsGridHeaderComponent', () => {
  let component: DetailsGridHeaderComponent;
  let fixture: ComponentFixture<DetailsGridHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsGridHeaderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGridHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
