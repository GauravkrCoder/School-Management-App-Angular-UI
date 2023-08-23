import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { RequestUserSignUpLoginModel } from 'src/app/models/signup-login.model';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;
  public formSubmitted: boolean = false;
  public componentSubscription: any = {};
  public _lfgemail: string | any;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.initLoginForm();

    this.componentSubscription.subscription1 = this._sharedService._publishUserSignupLogin.subscribe((response) => {
      if (response) {
        const token: string = response?.data?.token;
        this._lfgemail = 'testuser23@lfg.com';
        sessionStorage.setItem('_isLoggedIn', token);
        this._router.navigate(['./home']);
      }
    })
  }

  initLoginForm() {
    this.loginForm = this._fb.group({
      email_id: ['gauravkr@mailinator.com', [Validators.required]],
      password: ['abc@123', [Validators.required]]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  submitLogin() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      const _requestUserLoginModel = new RequestUserSignUpLoginModel();
      _requestUserLoginModel.email_id = this.loginForm.controls['email_id'].value;
      _requestUserLoginModel.password = this.loginForm.controls['password'].value;
      this._sharedService.userLogin(_requestUserLoginModel);
    }

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
