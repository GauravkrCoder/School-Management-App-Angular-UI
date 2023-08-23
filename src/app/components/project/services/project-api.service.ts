import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AppUtils from 'src/app/shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  private baseURL: string = AppUtils.getBaseApiURL();

  constructor(
    private _httpClient: HttpClient
  ) { }

  addNewProjectDetails(key?: any): Observable<any> {
    return this._httpClient.post(`${this.baseURL}/project/addproject`, key);
  }

  deleteProject(key: any): Observable<any> {    
    return this._httpClient.post(`${this.baseURL}/project/deleteproject`, key);
  }

}
