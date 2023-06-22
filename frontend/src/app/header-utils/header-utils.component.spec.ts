import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUtilsComponent } from './header-utils.component';

describe('HeaderUtilsComponent', () => {
  let component: HeaderUtilsComponent;
  let fixture: ComponentFixture<HeaderUtilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderUtilsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
