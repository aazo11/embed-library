import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfserveComponent } from './selfserve.component';

describe('SelfserveComponent', () => {
  let component: SelfserveComponent;
  let fixture: ComponentFixture<SelfserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
