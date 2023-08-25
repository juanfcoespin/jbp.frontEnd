import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfDashComponent } from './conf-dash.component';

describe('ConfDashComponent', () => {
  let component: ConfDashComponent;
  let fixture: ComponentFixture<ConfDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
