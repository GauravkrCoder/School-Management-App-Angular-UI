import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import AppUtils from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class SharedApisService {

  private baseURL: string = AppUtils.getBaseApiURL();

  constructor(
    private _httpClient: HttpClient
  ) { }

  getSampleDataList(key?: any): Observable<any> {
    return this._httpClient.get(`https://reqres.in/api/users?page=2`);
  }

  getJWTTokenValidation(key?: any): Observable<any> {
    return this._httpClient.post('http://localhost:3000/api/jwt/validate', key);
  }

  saveJWTTokenForValidation(key?: any): Observable<any> {
    return this._httpClient.post('http://localhost:3000/api/jwt/save', key);
  }

  getProjectDataList(key?: any): Observable<any> {
    return this._httpClient.get(`${this.baseURL}/project/getprojectlist`, { params: key });
  }

}
