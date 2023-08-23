import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectCommonFormComponent } from '../project-common-form/project-common-form.component';
import { FormType } from 'src/app/models/common.model';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  @ViewChild('projectCommonFormComponent') projectCommonFormComponent: ProjectCommonFormComponent
  public formTypeEnum = FormType;
  public componentSubscription: any = {};

  constructor(
    private _sharedService: SharedService,
    private _projectService: ProjectService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
   

  }

  ngAfterViewInit(): void {
    this.componentSubscription.subscription1 = this._projectService._publishEditInfoData.subscribe((editRowObj) => {
      if (editRowObj) {
        console.log(editRowObj)
        this.patchAndSetFormValidations(editRowObj);
      } 
      else {
        this._sharedService.triggerRedirection();
      }
    })  
    
    this.componentSubscription.subscription0 = this._sharedService._publishRedirectionFromEdit.subscribe((_response: any) => {
      if (_response) {
        this._router.navigate[('/project')];
      }
    })
  }

  patchAndSetFormValidations(editRowObj: any) {
    let _form = this.projectCommonFormComponent.projectForm;
    const _data = editRowObj?.data;
    _form?.patchValue(_data);
    _form.controls['project_type'].patchValue(_data.project_type.toLowerCase());
    _form.controls['project_status'].patchValue(_data.project_status.toLowerCase());
    _form.controls['project_start_date'].patchValue(_data?.additionalRowData[0]?.project_start_date);
    _form.controls['project_completion_date'].patchValue(_data?.additionalRowData[0]?.project_completion_date);
    _form.controls['project_assigned_developers'].patchValue(_data?.additionalRowData[0]?.project_assigned_developers);
    console.log(_form.value)
  }

  updateProjectDetails() {
    const _form = this.projectCommonFormComponent.projectForm;
    console.log(_form.value);
  }

}
