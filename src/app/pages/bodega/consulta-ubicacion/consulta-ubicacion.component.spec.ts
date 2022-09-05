import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaUbicacionComponent } from './consulta-ubicacion.component';

describe('ConsultaUbicacionComponent', () => {
  let component: ConsultaUbicacionComponent;
  let fixture: ComponentFixture<ConsultaUbicacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaUbicacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaUbicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
