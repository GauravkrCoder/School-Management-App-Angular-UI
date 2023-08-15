import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-msal-login',
  templateUrl: './msal-login.component.html',
  styleUrls: ['./msal-login.component.css']
})
export class MsalLoginComponent implements OnInit {

  public componentSubscriptions: any = {};
  public _commonMsgs: any;
  public _lfgemail: string | any;
  public _lfgUserID: string | any;
  // public _commonMsgs: ProjectConstants._commonMsgs
  // public )lfgUserID

  constructor(
    private _authService: MsalService,
    private _httpClient: HttpClient,
    private _router: Router,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.continueSession();
    this.isMsalLoggedIn();
  }

  continueSession() {
    if (this._sharedService.subsVar == undefined) {
      this._sharedService.subsVar = this._sharedService.invokeMSALLogin.subscribe(() => {
        this.isMsalLoggedIn();
      })
    }
  }

  public msalLogin() {
    this._authService.handleRedirectObservable().subscribe(response => {
      if (response != null) {
        console.log(response);
        this._authService.instance.setActiveAccount(response.account);
        sessionStorage.setItem('ssoToken', response.accessToken);
        /* Trigger this method when you need the User's LAN ID else you can bypass */
        // this.triggerGraphAPIforLanID(response);
        this.triggerEnvironmentCheck(response);    
      }
      else {
        this._authService.loginRedirect();
      }
    })
  }

  triggerGraphAPIforLanID(res: any): void {
    this.componentSubscriptions.subscriptin2 = this._httpClient
      .get('https://grapgh.microsoft.com/v1.0/me?$select=onPremisesSamAccountName',
        {
          'headers': { 'Authorization': 'Bearer ' + String(res.accessToken) }
        }).subscribe(_response => {
          const response = _response as any;
          if (response && response.onPremisesSamAccountName) {
            const _userid = response.onPremisesSamAccountName;
            sessionStorage.setItem('_user_id', _userid);
            this.triggerEnvironmentCheck(response);
          }
          else {
            // this._sharedService.triggerRedirection('graph user api failed');
            this._router.navigate(['./access-deined']);
          }
        });
  }

  triggerEnvironmentCheck(res: any): void {
    const _env = environment.returnParameters();

    if (_env.environment === 'LCL') {
      const token: string = res.accessToken;
      this._lfgemail = 'testuser23@lfg.com';
      sessionStorage.setItem('_isLoggedIn', token);
      this._router.navigate(['./home']);
      // this._sharedService.triggerJWTTOkenValidation({ applctn_token_id: token });
      // const tempToken="fhjkadhfhfnsahfhasf";
      // this._sharedService.triggerJWTTOkenValidation({ applctn_token_id:tempToken});
    }
    else {
      this.fetchTokenSilent(_env, res);
    }
  }

  fetchTokenSilent(_env: any, res: any): void {
    const objEnv = environment.returnParameters();
    this.componentSubscriptions.subscription3 = this._authService.acquireTokenSilent(
      { scopes: [`api://${objEnv.msalClientId}/taxreports/taxreports_AUD`] }
    ).subscribe(response => {
      console.log('Silent Token', response);
      const _authToken = response.accessToken;
      if (_authToken === null || _authToken === undefined) {
        this._authService.loginRedirect();
        return;
      }
      sessionStorage.setItem('_isLoggedIn', _authToken);
      // this._sharedService.triggerJWTTOkenValidation({ applctn_token_id: _authToken });
    },
      (_error) => {
        // this._sharedService.triggerRedirection('silent token failed');
        this._router.navigate(['./access-denied']);
      }
    )
  }

  public msalLogout() {
    this._authService.logout();
  }

  public isMsalLoggedIn() {
    if (this._authService.instance.getActiveAccount() != null) {
      this._router.navigate(['./home']);
    }
    else {
      this.msalLogin();
    }
  }

  ngOnDestroy() {
    // this.componentSubscriptions = Utils.unsubscribeAll(this.componentSubscriptions);
  }


}
