import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from 'projects/admin/src/enums/urls';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private http:HttpClient) {}
  getQuestions(first:number,rows:number,topic_id:number,query:string){
    let faculty_id = JSON.parse(localStorage.getItem('userInfo')||'{}').id
    return this.http.get<any>(URLS.BASE_URL + '/read/questions?faculty_id='+faculty_id+'&first='+first+'&rows='+rows+'&topic_id='+topic_id+'&query='+query);
  }
  
  getTopics(){
    return this.http.get<any>(URLS.BASE_URL + '/read/topics');
  }
  
  getQuestionById(id:number){
    let faculty_id = JSON.parse(localStorage.getItem('userInfo')||'{}').id
    return this.http.get<any>(URLS.BASE_URL + '/read/question_by_id?faculty_id='+faculty_id+'&id='+id);  
  }
  
  updateQuestion(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/update_question',body);  
  }

  deleteQuestion(question_id:any){
    return this.http.delete<any>(URLS.BASE_URL + '/delete/delete_question?question_id='+question_id);  
  }
}
