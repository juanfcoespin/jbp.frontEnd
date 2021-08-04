import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasUrbanoComponent } from './entregas-urbano.component';

describe('EntregasUrbanoComponent', () => {
  let component: EntregasUrbanoComponent;
  let fixture: ComponentFixture<EntregasUrbanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasUrbanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasUrbanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
