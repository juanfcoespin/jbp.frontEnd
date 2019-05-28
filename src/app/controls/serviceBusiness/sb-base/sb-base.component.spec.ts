import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbBaseComponent } from './sb-base.component';

describe('SbBaseComponent', () => {
  let component: SbBaseComponent;
  let fixture: ComponentFixture<SbBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
