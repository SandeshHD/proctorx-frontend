import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../../../enums/urls';

@Injectable({
  providedIn: 'root'
})
export class TestWindowService {

  constructor(private http: HttpClient) { }

  getTestData(id:number){
    return this.http.get<any>(URLS.BASE_URL + '/read/test?test_id=' + id);  
  }
  
  getTestInfo(id:number){
    return this.http.get<any>(URLS.BASE_URL + '/read/testInfo?test_id=' + id);  
  }
  
  patchQuestionScore(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/save_question',body);  
  }
  
  submitTest(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/submit_test',body);  
  }
}
