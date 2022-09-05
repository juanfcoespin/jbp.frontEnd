import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaLoteComponent } from './consulta-lote.component';

describe('ConsultaLoteComponent', () => {
  let component: ConsultaLoteComponent;
  let fixture: ComponentFixture<ConsultaLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
