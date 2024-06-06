import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorsComponent } from './supervisors.component';

describe('SupervisorsComponent', () => {
  let component: SupervisorsComponent;
  let fixture: ComponentFixture<SupervisorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisorsComponent]
    });
    fixture = TestBed.createComponent(SupervisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
