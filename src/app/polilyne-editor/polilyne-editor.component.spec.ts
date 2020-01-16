import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolilyneEditorComponent } from './polilyne-editor.component';

describe('PolilyneEditorComponent', () => {
  let component: PolilyneEditorComponent;
  let fixture: ComponentFixture<PolilyneEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolilyneEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolilyneEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
