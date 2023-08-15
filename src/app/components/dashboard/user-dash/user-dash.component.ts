import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataGridInputModel } from 'src/app/models/common.model';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {

  public objParentUser: DataGridInputModel;
  dockItems: MenuItem[];

  constructor(
    private _sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.initFetchSampleListData();
    this.objParentUser = this.setDataGridInputObj(true)
    this._sharedService._publishSampleListData.subscribe((result) => {
      if (result) {
        // console.log(result.data);       
        this.objParentUser.gridData = result.data;
        // console.log(this.objParentUser);
      }
    })

    this.dockItems = [
      {
        label: 'Finder',
        icon: "assets/images/facebook-svgrepo-com (1).svg"
      },
      {
        label: 'App Store',
        icon: "assets/images/google-svgrepo-com.svg"
      },
      {
        label: 'Photos',
        icon: "assets/images/microsoft-svgrepo-com.svg"
      },
      {
        label: 'Trash',
        icon: "assets/images/trash-svgrepo-com.svg"
      }
    ];
  }

  initFetchSampleListData() {
    this._sharedService.getSampleDataList();
  }

  setDataGridInputObj(zeroRecords: boolean): DataGridInputModel {
    const _dataGridInputModel: DataGridInputModel = new DataGridInputModel();
    _dataGridInputModel.datafor = 'userdash';
    _dataGridInputModel.headersCol = [
      { field: 'id', header: 'ID' },
      { field: 'first_name', header: 'FIRST NAME' },
      { field: 'last_name', header: 'LAST NAME' },
      { field: 'email', header: 'EMAIL ID' }
    ];
    _dataGridInputModel.enableMultiRowSelect = true;
    _dataGridInputModel.enableRowDelete = true;
    _dataGridInputModel.enableRowSelect = true;
    _dataGridInputModel.enableRowEdit = true;
    _dataGridInputModel.paginator = true;
    _dataGridInputModel.gridData = zeroRecords ? <any>[] : [{}];

    return _dataGridInputModel;

  }

}
