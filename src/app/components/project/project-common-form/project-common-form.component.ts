import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { FormType } from 'src/app/models/common.model';

@Component({
  selector: 'app-project-common-form',
  templateUrl: './project-common-form.component.html',
  styleUrls: ['./project-common-form.component.css']
})
export class ProjectCommonFormComponent implements OnInit {

  @Input('formType') formType: FormType;
  public formTypeEnum: FormType;
  public projectForm: FormGroup;
  public formSubmitted: boolean = false;
  public componentSubscriptions: any = {};
  public projectType = [];
  public projectStatus = [];

  constructor(
    private _fb: FormBuilder,
    private _projectService: ProjectService,
    private _router: Router
  ) {
    this.projectType = [
      { name: 'Web', project_type: 'web' },
      { name: 'Mobile App', project_type: 'mobile-app' }
    ];
    this.projectStatus = [
      { projectStatus: 'Active', project_status: 'active' },
      { projectStatus: 'Hold', project_status: 'hold' },
      { projectStatus: 'Delivered', project_status: 'delivered' }
    ];
  }

  ngOnInit(): void {
    this.initAddProjectForm();
  }
  

  initAddProjectForm() {
    this.projectForm = this._fb.group({
      project_title: [''],
      project_type: [''],
      project_status: [''],
      project_client: [''],
      project_assigned_manager: [''],
      sprint_planned: [''],
      project_cost: [''],
      project_start_date: [''],
      project_completion_date: [''],
      project_assigned_developers: [''],
      currency: ['USD']
    })
  }

}
