import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosEnviadosComponent } from './documentos-enviados.component';

describe('DocumentosEnviadosComponent', () => {
  let component: DocumentosEnviadosComponent;
  let fixture: ComponentFixture<DocumentosEnviadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentosEnviadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentosEnviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
