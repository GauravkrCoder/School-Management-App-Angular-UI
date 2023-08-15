import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { ActionType, Datafor } from 'src/app/models/common.model';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {

  @Input() getObjData: any = {};
  @Output() gridCallBack = new EventEmitter<any>();
  @ViewChild('gridComponentDataTable') datatable: Table;
  @ViewChild('paginator', { static: false }) paginator: Paginator;

  public totalRecords: any;
  public dataFor = Datafor;
  public selectAllRows: boolean = null;
  public selectedRowData: any = [];

  selectedValues: string[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.getObjData)
    this.totalRecords = this.getObjData.totalRecords;
  }

  public triggerGridAction(_actionType: any, data: any, _controlType = null) {
    const _data = (_controlType === 'itemSelection') ? this.selectedRowData : (_controlType === 'icon' ? data : null);
    this.gridCallBack.emit({ sourcePage: this.getObjData.datafor, data: _data, actionType: _actionType });
  }

  ngOnChanges() {
    this.selectedRowData = [];
    this.selectAllRows = false;
  }

  checkAllRows(event: any) {
    let checked = event.target.checked;
    console.log(checked)
    const _rowData = this.getObjData.gridData;
    _rowData.forEach(item => this.filterSelectedRows(item, checked, true));
    this.gridCallBack.emit({ sourcePage: this.getObjData.datafor, data: this.selectedRowData, actionType: ActionType.ROWSELECTION })
  }

  changeSingleCheckboxStatus(event: any, data: any) {
    this.filterSelectedRows(data, event.target.checked);
    this.gridCallBack.emit({ sourcePage: this.getObjData.datafor, data: this.selectedRowData, actionType: ActionType.ROWSELECTION });
  }

  filterSelectedRows(recordObj: any, ischk: boolean, isSelectAll: boolean = false) {
    if (this.selectedRowData.length === 0) {
      recordObj['selected'] == ischk;
      recordObj['preSelectRow'] = ischk;
      this.selectedRowData.push(recordObj);
      return
    }

    let _recordObj = recordObj;
    delete (_recordObj['selected']);
    delete (_recordObj['preSelectRow']);
    let _recordObjItem = JSON.stringify(_recordObj);
    let _count = 0;
    let _ind: number;

    this.selectedRowData.forEach((item, index) => {
      const _isSelected = item['selected'];
      const _isPreSelected = item['preSelectRow'];
      delete (item['selected']);
      delete (item['preSelectRow']);

      const _selectedRowDataItem = JSON.stringify(item);

      if (_selectedRowDataItem === _recordObjItem) {
        _count++;
        _ind - index;
      }
      item['selected'] = isSelectAll ? ischk : _isSelected;
      item['preSelectRow'] = isSelectAll ? ischk : _isPreSelected;
    });

    if (_count > 0) {
      (!isSelectAll || (isSelectAll && !ischk)) ? this.selectedRowData.splice(_ind, 1) : null;
      if (isSelectAll && ischk) {
        _recordObj['selected'] = ischk;
        _recordObj['preSelectRow'] = ischk;
      }
    }
    else {
      _recordObj['selected'] = ischk;
      _recordObj['preSelectRow'] = ischk;
      this.selectedRowData.push(_recordObj);
    }
    this.toggleSelectAll();

  }

  toggleSelectAll() {
    const _enableSelectAll = this.getObjData.gridData.filter(item => item['preSelectRow'] === true);
    this.selectAllRows = (_enableSelectAll.length === this.getObjData.gridData.length);
  }

  onPageChange(event) {
    console.log(event);
    this.gridCallBack.emit({ paginationObj: event, actionType: ActionType.PAGINATION });
  }

}
