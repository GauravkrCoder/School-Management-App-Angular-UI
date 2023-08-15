import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: MsalService,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
   
  }

  navigateToThirdPartyLogin(_loginProviderName: string) {
    if (_loginProviderName === 'msal') {
      this._router.navigate(['./msal']);
    }
    else if (_loginProviderName === 'google') {
      // this._router.navigate(['./msal']);
    }
  }  

}
