import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from 'projects/admin/src/enums/urls';

@Injectable({
  providedIn: 'root'
})
export class CreateTestService {

  constructor(private http:HttpClient) { }

  getTopics(){
    return this.http.get<any>(URLS.BASE_URL + '/read/topics');
  }
  
  createQuestion(body:any){
    return this.http.post<any>(URLS.BASE_URL + '/create/question',body);
  }
  
  getAllQuestions(first:number,rows:number,topic_id:number,query:string){
    return this.http.get<any>(URLS.BASE_URL + '/read/get_all_questions?first='+first+'&rows='+rows+'&topic_id='+topic_id+'&query='+query);
  }
  
  createTest(body:any){
    return this.http.post<any>(URLS.BASE_URL + '/create/test',body);
  }

  getTestInfoById(id:number){
    return this.http.get<any>(URLS.BASE_URL + '/read/testInfo?test_id='+ id);
  }

  getQuestionsByTestId(id:number){
    return this.http.get<any>(URLS.BASE_URL + '/read/test_questions?test_id='+ id);
  }

  updateTest(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/update_test',body);  
  }

  deleteTest(test_id:any){
    return this.http.delete<any>(URLS.BASE_URL + '/delete/delete_test?test_id='+test_id);  
  }

}
