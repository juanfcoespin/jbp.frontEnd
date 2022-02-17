import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RptFacturasHistoricasComponent } from './rpt-facturas-historicas.component';

describe('RptFacturasHistoricasComponent', () => {
  let component: RptFacturasHistoricasComponent;
  let fixture: ComponentFixture<RptFacturasHistoricasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RptFacturasHistoricasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RptFacturasHistoricasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
