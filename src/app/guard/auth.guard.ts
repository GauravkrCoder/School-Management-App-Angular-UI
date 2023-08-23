import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _sharedService: SharedService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (sessionStorage.getItem('_isLoggedIn') === null || sessionStorage.getItem('_isLoggedIn') === undefined) {
      this._router.navigate(['./msal']);
      return false;
    }

    if (this._sharedService.clientRoles === null || this._sharedService.clientRoles === undefined) {
      this._router.navigate(['./access-deinied']);
      return false;
    } else if (next.data['requiredRole']) {
      return this.hasAuthorizedRole(next);
    }

    /* === WHAR NEEDS TO BE DONE WHEN LFG ID DOESN'T EXISTS  === */
    // if (sessionStorage.getItem('_user_id') === null || sessionStorage.getItem('_user_id') === undefined) {
    //   return false;
    // }

    return true;
  }


  hasAuthorizedRole(next: ActivatedRouteSnapshot): boolean {
    const _requiredRole = next.data['requiredRole'];
    const _isAuthorize = this._sharedService.clientRoles;   
    if (_requiredRole.find(element => _isAuthorize.includes(element))) {
      return true;
    }
    else {
      this._router.navigate(['./access-denied']);
      return false;
    }
  }

}
