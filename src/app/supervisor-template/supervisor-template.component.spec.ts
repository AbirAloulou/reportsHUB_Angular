import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorTemplateComponent } from './supervisor-template.component';

describe('SupervisorTemplateComponent', () => {
  let component: SupervisorTemplateComponent;
  let fixture: ComponentFixture<SupervisorTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisorTemplateComponent]
    });
    fixture = TestBed.createComponent(SupervisorTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
