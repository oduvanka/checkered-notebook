import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulersComponent } from './rulers.component';

describe('RulersComponent', () => {
  let component: RulersComponent;
  let fixture: ComponentFixture<RulersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
