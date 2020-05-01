import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLibraryComponent } from './widget-library.component';

describe('WidgetLibraryComponent', () => {
  let component: WidgetLibraryComponent;
  let fixture: ComponentFixture<WidgetLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
