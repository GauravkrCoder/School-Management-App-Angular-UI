import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import AppUtils from '../../utils/utils';
import { ActionType } from 'src/app/models/common.model';
import { AppConstants } from '../../statics/app-constants';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.css']
})
export class ConfirmActionComponent implements OnInit {

  public statement1: string = '';
  public itemToDeleteForDisplay: string;
  public commonMsg = AppConstants.commonMsgs;

  constructor(
    public _dynamicDialogRef: DynamicDialogRef,
    public _dynamicDialogConfig: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.initDialogAction();
  }

  initDialogAction() {
    const _actionType = this._dynamicDialogConfig?.data?.actionType;
    const _rowDataObj = this._dynamicDialogConfig?.data;
    const _dataObj = _rowDataObj?.data;
    this.statement1 = AppUtils.getMsgOnActionType(_actionType);

    if (_dataObj && _actionType === ActionType.DELETE) {
      const _ifDataIsArray: boolean = (_dataObj.length >= 1);
      this.itemToDeleteForDisplay = _ifDataIsArray ? 'Selected item(s)' : this.getItemDeleteForDisplay(_rowDataObj);
    }

  }

  getItemDeleteForDisplay(_rowDataObj: any): string {
    let _itemToDeleteForDisplay: string = '';
    const _forDisplay = _rowDataObj['forDisplay'];
    const _forDisplayCount = _forDisplay.length;
    _forDisplay.forEach((displayValue: string, ind: number) => {
      let _separator = (ind !== _forDisplayCount - 1) ? ' / ' : '';
      _itemToDeleteForDisplay += _rowDataObj.data[displayValue] + _separator;
    });

    return _itemToDeleteForDisplay;
  }

  onConfirmAction() {
    console.log(this._dynamicDialogConfig.data)
    this._dynamicDialogRef.close(this._dynamicDialogConfig.data);
  }

  cancelForm() {
    this._dynamicDialogRef.close({ actionType: ActionType.CANCEL });
  }

}
