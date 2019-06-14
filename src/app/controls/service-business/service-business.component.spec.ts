import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBusinessComponent } from './service-business.component';

describe('ServiceBusinessComponent', () => {
  let component: ServiceBusinessComponent;
  let fixture: ComponentFixture<ServiceBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
