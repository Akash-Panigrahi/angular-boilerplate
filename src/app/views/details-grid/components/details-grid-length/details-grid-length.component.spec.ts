import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGridLengthComponent } from './details-grid-length.component';

describe('DetailsGridLengthComponent', () => {
  let component: DetailsGridLengthComponent;
  let fixture: ComponentFixture<DetailsGridLengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsGridLengthComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGridLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
