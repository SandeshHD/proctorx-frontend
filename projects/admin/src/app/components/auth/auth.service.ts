import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URLS} from '../../../enums/urls'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  authenticate(body:any){
    return this.http.post<any>(URLS.BASE_URL+'/auth/faculty_auth',body)
  }
  getBranches(){
    return this.http.get<any>(URLS.BASE_URL + '/read/branches');
  }

  createUser(body:any){
    return this.http.post<any>(URLS.BASE_URL+'/create/faculty',body)
  }
}
