import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSingleRComponent } from './test-single-r.component';

describe('TestSingleRComponent', () => {
  let component: TestSingleRComponent;
  let fixture: ComponentFixture<TestSingleRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSingleRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSingleRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
