import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URLS} from '../../../enums/urls'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  authenticate(body:any){
    return this.http.post<any>(URLS.BASE_URL+'/auth/admin_auth',body)
  }
}
