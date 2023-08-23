import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionType, DataGridInputModel, Datafor, RecordsPerPageDataGrid } from 'src/app/models/common.model';
import { ConfirmActionComponent } from 'src/app/shared/components/confirm-action/confirm-action.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProjectService } from '../services/project.service';
import { DatePipe } from '@angular/common';
import { DataGridComponent } from 'src/app/shared/components/data-grid/data-grid.component';
import { RequestProjectListModel } from 'src/app/models/projectList.model';
import AppUtils from 'src/app/shared/utils/utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  public _objParentProject: DataGridInputModel;
  public componentSubscription: any = {};
  @ViewChild('dataGridComponent') dataGridComponent: DataGridComponent;
  public searchProjectForm: FormGroup;
  public isFilterSet: boolean = false;

  constructor(
    private _sharedService: SharedService,
    private _projectService: ProjectService,
    private _router: Router,
    private _datepipe: DatePipe,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initSearchProjectForm();
    this.initFetchProjectDataList();
    this._objParentProject = this.setDataGridInputObj(true);
    this.componentSubscription.subscription0 = this._sharedService.publishProjectList.subscribe((response) => {
      if (response) {
        const _gridData = this.remapProjectDataList(response.data);
        this._objParentProject.gridData = _gridData;
        this._objParentProject.totalRecords = response.total;
        this._objParentProject.offset = response.offset;
      }
    });

    this.componentSubscription.subscription1 = this._projectService._publishCRUDsuccess.subscribe((response) => {
      if (response) {
        this.initFetchProjectDataList();
        this._router.navigate(['./project']);
      }
    })

  }

  initSearchProjectForm() {
    this.searchProjectForm = this._fb.group({
      project_title: [''],
      project_client: [''],
      project_assigned_manager: [''],
      sprint_planned: [''],
      project_type: [''],
      project_status: [''],
      // project_cost: [''],
      // project_start_date: [''],
      // project_completion_date: [''],
    })
  }

  setDataGridInputObj(zeroRecords: boolean): DataGridInputModel {
    const _dataGridInputModel: DataGridInputModel = new DataGridInputModel();
    _dataGridInputModel.datafor = Datafor.PROJECT;
    _dataGridInputModel.headersCol = [
      { field: 'project_title', header: 'TITLE' },
      { field: 'project_client', header: 'CLIENT' },
      { field: 'project_assigned_manager', header: 'PROJECT MANAGER' },
      { field: 'sprint_planned', header: 'SPRINT PLANNED' },
      { field: 'project_cost', header: 'AMOUNT' },
      { field: 'project_type', header: 'TYPE' },
      { field: 'project_status', header: 'STATUS' }
    ];
    _dataGridInputModel.enableMultiRowSelect = true;
    _dataGridInputModel.enableRowDelete = true;
    _dataGridInputModel.enableRowSelect = true;
    _dataGridInputModel.enableRowEdit = true;
    _dataGridInputModel.paginator = true;
    _dataGridInputModel.rowsPerPage = RecordsPerPageDataGrid.PERPAGE;
    _dataGridInputModel.enableRowExpansion = true;
    _dataGridInputModel.gridData = zeroRecords ? <any>[] : [{}];

    return _dataGridInputModel;

  }

  initFetchProjectDataList() {
    let _requestProjectListModel = this.getRequestDataModel();
    this._sharedService.getProjectDataList(_requestProjectListModel);
  }

  remapProjectDataList(result: any) {
    return result.map((element) => {
      let data = {
        prject_id: element.prject_id,
        project_title: element.project_title,
        project_client: element.project_client,
        project_assigned_manager: element.project_assigned_manager,
        sprint_planned: element.sprint_planned,
        project_cost: element.project_cost,
        project_type: element.project_type.toUpperCase(),
        project_status: element.project_status.toUpperCase(),
        additionalRowData: [
          {
            project_assigned_developers: element.project_assigned_developers,
            project_start_date: this._datepipe.transform(element.project_start_date, 'dd-MM-yyyy'),
            project_completion_date: this._datepipe.transform(element.project_completion_date, 'dd-MM-yyyy')
          }
        ]
      }
      return data;
    })
  }

  getRequestDataModel(eventData: any = null): RequestProjectListModel {
    const _requestProjectListModel = new RequestProjectListModel();
    _requestProjectListModel.offset = eventData ? eventData.paginationObj?.first : RecordsPerPageDataGrid.OFFSET;
    _requestProjectListModel.perpage = eventData ? eventData.paginationObj?.rows : RecordsPerPageDataGrid.PERPAGE;
    return _requestProjectListModel
  }

  gotoAddNewProject() {
    this._router.navigate(['/project/add']);
  }

  gridCallBackFunction(eventData: any) {
    if (eventData.actionType === ActionType.EDIT) {
      this._projectService.getEditInfoDataForProject(eventData);
      this._router.navigate(['/project/edit']);
    }
    else if (eventData.actionType === ActionType.DELETE) {
      const _extras = {
        forDisplay: ['project_title'],
        forPayload: 'prject_id'
      }
      let _option: any;
      _option = {
        component: ConfirmActionComponent,
        config: {
          header: 'DELETE',
          styleClass: 'pop-up-css',
          data: Object.assign(eventData, _extras)
        },
      };
      this._projectService.showDialog(_option)
    }
    else if (eventData.actionType === ActionType.PAGINATION) {
      if (this.isFilterSet) {
        // this.onClickFilter(eventData)
      }
      else {
        const _requestProjectListModel = this.getRequestDataModel(eventData);
        this._sharedService.getProjectDataList(_requestProjectListModel);
      }
    }
  }

  deleteProjectLists() {
    this.dataGridComponent.triggerGridAction(ActionType.DELETE, '', 'itemSelection');
  }

  downloadDataToFile(fileFormat: string) {
    if (fileFormat === 'csv') {
      // this.initFetchViewrequestDataList(true, fileFormat);
    } else {
      AppUtils.downloadDataTofile('pdf', this._objParentProject);
    }
  }

  clearAllFilterData() {
    this.searchProjectForm.reset();
    this.initFetchProjectDataList();
  }

  searchProjectDetailsForm(filterData?: any, _perpage: number = RecordsPerPageDataGrid.PERPAGE) {
    const _form = this.searchProjectForm;
    if (_form?.invalid) {
      return
    }
    let _requestProjectListModel = this.getRequestDataModel();
    const _formData = AppUtils.removeNullFormControlValues(_form);
    _requestProjectListModel = Object.assign(_requestProjectListModel, _formData);
    console.log(_requestProjectListModel);

    if (this.isFilterSet && filterData != undefined) {
      _requestProjectListModel.offset = filterData?.paginationObj?.first;
      _requestProjectListModel.perpage = filterData?.paginationObj?.rows;
    }
    else {
      if (_perpage !== -1) {
        this._objParentProject = this.setDataGridInputObj(false);
        this.isFilterSet = true;
        this._sharedService.searchCriteria = _requestProjectListModel;
      } else {
        this.isFilterSet = false;
        this._sharedService.searchCriteria = null;
      }
      _requestProjectListModel.perpage = _perpage;
      this._projectService.searchProjectListData(_requestProjectListModel);
    }

  }

}
