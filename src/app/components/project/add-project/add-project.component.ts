import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public addProjectForm: FormGroup;
  public formSubmitted: boolean = false;
  public componentSubscriptions: any = {};

  public projectType = [];
  public projectStatus = [];
  values: string[];

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

    this.componentSubscriptions.subscription0 = this._projectService._publishCRUDsuccess.subscribe((response: any) => {
      if (response) {
        this._router.navigate(['/project']);
      }
    })
  }

  initAddProjectForm() {
    this.addProjectForm = this._fb.group({
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
      currency:['USD']
    })
  }

  addNewProject() {
    console.log(this.addProjectForm.value)
    this._projectService.addNewProjectDetails(this.addProjectForm.value);
  }

}
