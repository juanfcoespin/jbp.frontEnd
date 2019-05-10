import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionParticipantesPuntosComponent } from './gestion-participantes-puntos.component';

describe('GestionParticipantesPuntosComponent', () => {
  let component: GestionParticipantesPuntosComponent;
  let fixture: ComponentFixture<GestionParticipantesPuntosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionParticipantesPuntosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionParticipantesPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
