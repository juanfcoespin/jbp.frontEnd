import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCuentaPtkComponent } from './estado-cuenta-ptk.component';

describe('EstadoCuentaPtkComponent', () => {
  let component: EstadoCuentaPtkComponent;
  let fixture: ComponentFixture<EstadoCuentaPtkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoCuentaPtkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCuentaPtkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
