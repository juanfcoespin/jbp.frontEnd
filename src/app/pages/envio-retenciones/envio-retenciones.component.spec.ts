import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioRetencionesComponent } from './envio-retenciones.component';

describe('EnvioRetencionesComponent', () => {
  let component: EnvioRetencionesComponent;
  let fixture: ComponentFixture<EnvioRetencionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvioRetencionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvioRetencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
