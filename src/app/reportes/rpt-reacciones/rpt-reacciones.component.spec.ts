import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RptReaccionesComponent } from './rpt-reacciones.component';

describe('RptReaccionesComponent', () => {
  let component: RptReaccionesComponent;
  let fixture: ComponentFixture<RptReaccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RptReaccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RptReaccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
