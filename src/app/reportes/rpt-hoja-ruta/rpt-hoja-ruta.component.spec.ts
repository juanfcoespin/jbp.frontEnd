import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RptHojaRutaComponent } from './rpt-hoja-ruta.component';

describe('RptHojaRutaComponent', () => {
  let component: RptHojaRutaComponent;
  let fixture: ComponentFixture<RptHojaRutaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RptHojaRutaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RptHojaRutaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
