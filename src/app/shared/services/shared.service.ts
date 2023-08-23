import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { SharedApisService } from './shared-apis.service';
import AppUtils from '../utils/utils';
import { RolesDefined } from '../statics/roles-constants';
import { GenericApiMessageComponent } from '../components/generic-api-message/generic-api-message.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AppConstants } from '../statics/app-constants';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public _commonMesg = AppConstants.commonMsgs;

  public _publishSampleListData: Subject<any> = new Subject<any>();
  private _sampleListData: any;

  public _publishUserSignupLogin: Subject<any> = new Subject<any>();
  private _userSignupLoggedIn: any;

  public invokeMSALLogin = new EventEmitter();
  public subsVar: Subscription;
  public _publishSessionTimeout: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public _publishJWTTokenValidity: Subject<any> = new Subject<any>();
  public _publishJWTTokenSaveResponse: Subject<any> = new Subject<any>();

  public publishProjectList: Subject<any> = new Subject<any>();
  private projectDataList: any;

  public _publishRedirectionFromEdit: Subject<boolean> = new Subject<boolean>();

  public _clientRoles: Array<string>;

  public searchCriteria: any = null;

  constructor(
    private _sharedApiService: SharedApisService,
    private _dialogService: DialogService,
  ) { }

  get publishSampleListData(): any {
    return this._sampleListData;
  }

  set publishSampleListData(data: any) {
    this._sampleListData = data;
    this._publishSampleListData.next(data);
  }

  set publishSessionTimeout(data: boolean) {
    this._publishSessionTimeout.next(data);
  }

  set publishJWTTokenResponse(response: any) {
    this._publishJWTTokenValidity.next(response);
  }

  set jwtTokenSaveResponse(response: any) {
    this._publishJWTTokenSaveResponse.next(response);
  }

  get publishProjectDataList() {
    return this.projectDataList;
  }

  set publishProjectDataList(data: any) {
    this.projectDataList = data;
    this.publishProjectList.next(data);
  }

  set publishRedirectionFromEdit(flag: boolean) {
    this._publishRedirectionFromEdit.next(flag);
  }

  set publishUserSignupLogin(data: any) {
    this._publishUserSignupLogin.next(data);
  }

  publishUserSignupLoginOperation(response: any) {
    if (response) {
      this.publishUserSignupLogin = response;
    }
  }

  userLogin(params: any) {
    this._sharedApiService.userLogin(params).subscribe((response) => {
      if (response) {
        this.publishUserSignupLoginOperation(response);
      }
    })
  }

  triggerJWTTokenValidation(params: any) {
    this._sharedApiService.getJWTTokenValidation(params).subscribe((response) => {
      if (response) {
        this.publishJWTTokenResponse = response;
      }
    })
  }

  saveJWTTokenForValidation(params?: any) {
    this._sharedApiService.saveJWTTokenForValidation(params).subscribe((response) => {
      if (response) {
        this.jwtTokenSaveResponse = response;
      }
    })
  }

  getSampleDataList(params?: any) {
    this._sharedApiService.getSampleDataList().subscribe((response) => {
      if (response) {
        this.publishSampleListData = response;
      }
    })
  }

  getProjectDataList(params?: any) {
    this._sharedApiService.getProjectDataList(params).subscribe((response) => {
      if (response) {
        this.publishProjectDataList = response;
      }
    })
  }

  get clientRoles(): Array<any> {
    if (this._clientRoles) {
      return this._clientRoles;
    }
    else {
      this._clientRoles = this.setClientRolesFromToken();
      return this._clientRoles;
    }
  }

  setClientRolesFromToken(): Array<any> {
    const _env: string = AppUtils.getAppEnv();
    let _clientRoles;
    const _localClientRoles = [
      RolesDefined.viewAll,
      RolesDefined.readWriteAll,
      RolesDefined.viewAdmin,
      RolesDefined.manageAdmin,
      RolesDefined.viewRequest,
      RolesDefined.manageRequest,
    ];
    const _token = sessionStorage.getItem('_isLoggedIn');
    if (_token === null || _token === undefined) {
      return null;
    }
    if (_env === 'LCL') {
      _clientRoles = _localClientRoles;
    }
    else if (_token) {
      // const _decodeToken: any = jwt_deocde(_token);
      // _clientRoles = (_decodeToken?.roles && _decodeToken?.roles.length > 0) ? _decodeToken?.roles : [];
    }
    return _clientRoles;
  }

  public showDialog(options: any, isGenericMsg: boolean = false, isEditScreen: boolean = false): void {
    const _component = !isGenericMsg ? options.component : GenericApiMessageComponent;
    const ref = this._dialogService.open(_component, options.config);

    ref.onClose.subscribe((response) => {
      if (response) {
        console.log('Closing Dialog');
      }
      else if (isEditScreen) {
        this.publishRedirectionFromEdit = true;
      }
    })

  }

  public triggerRedirection(msg: string = null, _userConfirmationNeeded: boolean = false): void {
    const _msg = msg ? msg : this._commonMesg.edit_data_not_available;   
    const _redirection = msg ? false : true;
    console.log(_redirection)
    const _options = {
      config: { styleClass: 'lfg-dialog-small', data: { message: _msg, isConfirmationNeeded: _userConfirmationNeeded } }
    }
    console.log(_options)
    this.showDialog(_options, true, _redirection);
  }


}
