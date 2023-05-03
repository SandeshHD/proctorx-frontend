import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../../../../enums/urls';

@Injectable({
  providedIn: 'root'
})

export class ViewTestsService {

  constructor(private http:HttpClient) { }

  getTests(first:number,rows:number,show:string,query:string){
    let id = JSON.parse(localStorage.getItem('userInfo')||'{}').id
    return this.http.get<any>(URLS.BASE_URL + '/read/faculty_tests?faculty_id='+id+'&rows='+rows+'&first='+first+'&show='+show+'&query='+query);  
  }
  
  getTestQuestions(id:number){
    return this.http.get<any>(URLS.BASE_URL + '/read/test_questions?test_id='+id);  
  }
  
  changeStatus(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/change_status',body);  
  }
  
  getStudentsResults(id:number,first:number,rows:number){
    return this.http.get<any>(URLS.BASE_URL + '/read/view_results?test_id='+id+'&rows='+rows+'&first='+first);  
  }
}
