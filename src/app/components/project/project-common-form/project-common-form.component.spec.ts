import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCommonFormComponent } from './project-common-form.component';

describe('ProjectCommonFormComponent', () => {
  let component: ProjectCommonFormComponent;
  let fixture: ComponentFixture<ProjectCommonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCommonFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCommonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
