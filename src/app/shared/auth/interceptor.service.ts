import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../statics/app-constants';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private _sharedService: SharedService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    /* TO DO */
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this._sharedService.setLoading(true,request.url);
    let headers = new HttpHeaders();
    const requestType: any = request.params.get("reqestType") ? request.params.get("reqestType") : "JSON";
    const requestMethod = this.isCRUDrequestMethod(request.method);

    if (request.url.indexOf('graph.miccrosift.com') == -1) {
      headers = this.setCorrelationIdInHeader(requestType, headers, request);
      headers = this.setBearerTokenInHeader(headers);
      headers = this.setUserIdInHeader(headers);
      headers = headers.set('Accept', 'application/json');
      request = request.clone({ headers: headers });
    }

    return next.handle(request).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {         
          // this._sharedService.setLoading(false,request.url);
          if (evt.body && (evt.body.statusCode === 200 || evt.body.message) && requestMethod) {
            this.triggerAPIstatusMsg((evt.body.message || evt.body.message), (evt.body.statusCode));
          }
        }
      }),
      catchError((error, _caught) => {
        if (request.url.indexOf('jwtValidation/validate') != -1) {
          this._router.navigate(['../access-denied'], { relativeTo: this._activatedRoute });
        }
        // this._sharedService.setLoading(false,request.url);
        // this._sharedService.blockScreen = false;

        if ((error?.error || error.error?.statusCode || error?.status)) {
          this.triggerAPIstatusMsg(error?.error?.message, (error?.error?.statusCode || error?.status), true);
        }
        else {
          this.triggerAPIstatusMsg('unknown', null, true);
        }
        return of(error);
      }) as any
    )
  }

  isCRUDrequestMethod(method: string): boolean {
    const _method: string = method.toLowerCase();
    return (_method === "post" || _method === "put" || _method === "delete");
  }

  setCorrelationIdInHeader(requestType: string, headers: HttpHeaders, request: any): HttpHeaders {
    if (requestType === "JSON" && request.url.indexOf('docs') == -1) {
      headers = headers.set('Content-Type', 'application/json');
    }
    else {
      if (request.method !== 'PUT') {
        headers = headers.set('Content-Type', 'application/json');
      }
      else {
        headers = headers.set('Content-Type', 'multipart/form-data');
      }
    }

    // headers = headers.set('Access-Control-Allow-Methods', '*');
    // headers = headers.set('X_correlation_id', this.triggerGenerateUUID());
    return headers;
  }

  setBearerTokenInHeader(headers: HttpHeaders): HttpHeaders {
    const token: any = sessionStorage.getItem('_isLoggedIn');
    if (token) {
      // headers = headers.set('Authorization', 'Bearer ' + String(token));
      const tempToken = "gfhgdfajgfsdfjhsjfjksdfshfkj";
      headers = headers.set('Authorization', 'Bearer ' + String(tempToken));
    }
    return headers;
  }

  setUserIdInHeader(headers: HttpHeaders): HttpHeaders {
    const _userId = sessionStorage.getItem('_user_id');
    // headers = headers.set('X_user_id', 'gamku8');
    if (_userId) {
      headers = headers.set('X_user_id', _userId);
    }
    return headers;
  }

  triggerGenerateUUID() {
    const ruuid = window.crypto.randomUUID();
    const uuid = ruuid.substring(0, 5);
    const _env = environment.returnParameters();
    const _ts = (new Date()).getTime();
    const _statStr = 'APG-' + _env.environment + '-' + _ts + '-';
    return _statStr + uuid;
  }

  triggerAPIstatusMsg(msg: string, statusCode?: number, isError: boolean = false) {

    const _predefinedAPImsgs = AppConstants.apiStatusMsgs;
    const _msgsToExcludeFromDisplay = AppConstants.ignoreApiMsgs;

    if (_msgsToExcludeFromDisplay.includes(msg)) {
      return;
    }

    let _message: string = '';

    if (_predefinedAPImsgs[msg]) {
      _message = _predefinedAPImsgs[msg];
    }
    else if (statusCode && statusCode === 422) {
      _message = _predefinedAPImsgs['unprocessable_entity'];
    }
    else if (statusCode && statusCode === 406) {
      _message = _predefinedAPImsgs['unprocessable_entity'];
    }
    else if (statusCode && statusCode === 400) {
      _message = _predefinedAPImsgs['unprocessable_entity'];
    }
    else if (isError) {
      const _msg = statusCode ? _predefinedAPImsgs['system_error'] : _predefinedAPImsgs['unknown_error'];
      _message = _msg;
    }
    const _options = {
      config: { styleClass: 'lfg-dialog-small', data: { type: 'api-status-msg', extras: {}, message: _message } }
    }

    this._sharedService.showDialog(_options, true);
  }
}
