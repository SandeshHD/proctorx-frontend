import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../../../../enums/urls';

@Injectable({
  providedIn: 'root'
})

export class ViewTestsService {

  constructor(private http:HttpClient) { }

  getTests(first:number,rows:number,branch_id:number,show:string,query:string){
    return this.http.get<any>(URLS.BASE_URL + '/read/all_tests?rows='+rows+'&first='+first+'&branch_id='+branch_id+'&show='+show+'&query='+query);  
  }
  
  getTestQuestions(id:number){
    return this.http.get<any>(URLS.BASE_URL + '/read/test_questions?test_id='+id);  
  }

  getBranches(){
    return this.http.get<any>(URLS.BASE_URL + '/read/branches');  
  }
  
  getStudentsResults(id:number,first:number,rows:number){
    return this.http.get<any>(URLS.BASE_URL + '/read/view_results?test_id='+id+'&rows='+rows+'&first='+first);  
  }

  changeStatus(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/change_status',body);  
  }
  
  
  deleteTest(test_id:any){
    return this.http.delete<any>(URLS.BASE_URL + '/delete/delete_test?test_id='+test_id);  
  }
}
