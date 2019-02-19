import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGridInfoComponent } from './details-grid-info.component';

describe('DetailsGridInfoComponent', () => {
  let component: DetailsGridInfoComponent;
  let fixture: ComponentFixture<DetailsGridInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsGridInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGridInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
