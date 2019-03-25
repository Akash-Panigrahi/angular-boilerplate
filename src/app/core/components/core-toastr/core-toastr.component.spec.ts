import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreToastrComponent } from './core-toastr.component';

describe('CoreToastrComponent', () => {
  let component: CoreToastrComponent;
  let fixture: ComponentFixture<CoreToastrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreToastrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
