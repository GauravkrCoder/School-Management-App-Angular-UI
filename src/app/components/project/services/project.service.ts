import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ProjectApiService } from './project-api.service';
import { ActionType } from 'src/app/models/common.model';
import { Subject } from 'rxjs';
import AppUtils from 'src/app/shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public _publishCRUDsuccess: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _dialogService: DialogService,
    private _projectApiService: ProjectApiService
  ) { }

  set publishCRUDsuccess(val: boolean) {
    this._publishCRUDsuccess.next(val);
  }

  public showDialog(option: any): void {
    const ref = this._dialogService.open(option.component, option.config);

    ref.onClose.subscribe((response) => {
      if (Response && (response.actionType && response.actionType !== ActionType.CANCEL)) {
        console.log('Trigger Delete API')
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
    console.log(_dataObj);
    const _payloadString = AppUtils.payloadStringForDeleteAction(_dataObj);
    let _payloadObj = {};
    _payloadObj[_dataObj['forPayload']] = _payloadString;    
    this._projectApiService.deleteProject(_payloadObj).subscribe((response: any) => {
      if (response) {
        this.publshCRUDresponseStatus(response);
      }
    })
  }

}
