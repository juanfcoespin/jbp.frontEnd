import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorioTelefonicoComponent } from './directorio-telefonico.component';

describe('DirectorioTelefonicoComponent', () => {
  let component: DirectorioTelefonicoComponent;
  let fixture: ComponentFixture<DirectorioTelefonicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorioTelefonicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorioTelefonicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
