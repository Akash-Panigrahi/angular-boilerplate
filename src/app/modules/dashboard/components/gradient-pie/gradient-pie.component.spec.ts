import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientPieComponent } from './gradient-pie.component';

describe('GradientPieComponent', () => {
  let component: GradientPieComponent;
  let fixture: ComponentFixture<GradientPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
