import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNumFacturaExportacionComponent } from './update-num-factura-exportacion.component';

describe('UpdateNumFacturaExportacionComponent', () => {
  let component: UpdateNumFacturaExportacionComponent;
  let fixture: ComponentFixture<UpdateNumFacturaExportacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNumFacturaExportacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNumFacturaExportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
