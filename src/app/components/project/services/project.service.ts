import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectApiService } from './project-api.service';
import { ActionType } from 'src/app/models/common.model';
import { BehaviorSubject, Subject } from 'rxjs';
import AppUtils from 'src/app/shared/utils/utils';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public _publishCRUDsuccess: Subject<boolean> = new Subject<boolean>();
  public _publishEditInfoData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private editInfoData: any;

  constructor(
    private _dialogService: DialogService,
    private _projectApiService: ProjectApiService,
    private _sharedService: SharedService
  ) { }

  set publishCRUDsuccess(val: boolean) {
    this._publishCRUDsuccess.next(val);
  }

  get publishEditInfoDataForProject() {
    return this.editInfoData;
  }

  set publishEditInfoDataForProject(data: any) {
    this.editInfoData = data;
    this._publishEditInfoData.next(data);
  }

  public showDialog(option: any): void {
    const ref = this._dialogService.open(option.component, option.config);

    ref.onClose.subscribe((response) => {
      if (Response && (response.actionType && response.actionType !== ActionType.CANCEL)) {
        this.triggerPostDialogResponseAction(response);
      }
    })
  }

  addNewProjectDetails(params: any) {
    this._projectApiService.addNewProjectDetails(params).subscribe((response) => {
      if (response) {
        this.publshCRUDresponseStatus(response);
      }
    })
  }

  publshCRUDresponseStatus(response: any) {
    if (response) {
      this.publishCRUDsuccess = true;
    }
  }

  triggerPostDialogResponseAction(responseData: any): void {
    if (responseData.actionType === ActionType.DELETE) {
      this.triggerDeleteOperation(responseData);
    }
  }

  triggerDeleteOperation(_dataObj: any) {
    const _payloadString = AppUtils.payloadStringForDeleteAction(_dataObj);
    let _payloadObj = {};
    _payloadObj[_dataObj['forPayload']] = _payloadString;
    this._projectApiService.deleteProject(_payloadObj).subscribe((response: any) => {
      if (response) {
        this.publshCRUDresponseStatus(response);
      }
    })
  }

  searchProjectListData(data?: any) {
    this._sharedService.searchCriteria = data;
    this._sharedService.getProjectDataList(data);
  }

  getEditInfoDataForProject(data?: any) {
    this.publishEditInfoDataForProject = data;
  }

}
