import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-generic-api-message',
  templateUrl: './generic-api-message.component.html',
  styleUrls: ['./generic-api-message.component.css']
})
export class GenericApiMessageComponent implements OnInit {

  public displayMessage: string;

  constructor(
    private _dynamicDialogRef: DynamicDialogRef,
    private _dynamicDialogConfig: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    const _data = this._dynamicDialogConfig?.data ? this._dynamicDialogConfig?.data : '';
    this.displayMessage = _data.message;
  }

  closeDialog() {
    this._dynamicDialogRef.close();
  }

}
