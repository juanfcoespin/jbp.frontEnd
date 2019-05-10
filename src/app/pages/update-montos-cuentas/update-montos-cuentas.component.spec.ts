import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMontosCuentasComponent } from './update-montos-cuentas.component';

describe('UpdateMontosCuentasComponent', () => {
  let component: UpdateMontosCuentasComponent;
  let fixture: ComponentFixture<UpdateMontosCuentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMontosCuentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMontosCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
