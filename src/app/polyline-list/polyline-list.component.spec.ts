import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolylineListComponent } from './polyline-list.component';

describe('PolylineListComponent', () => {
  let component: PolylineListComponent;
  let fixture: ComponentFixture<PolylineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolylineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolylineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
