import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesEncontradosDialogComponent } from './clientes-encontrados-dialog.component';

describe('ClientesEncontradosDialogComponent', () => {
  let component: ClientesEncontradosDialogComponent;
  let fixture: ComponentFixture<ClientesEncontradosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesEncontradosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesEncontradosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
