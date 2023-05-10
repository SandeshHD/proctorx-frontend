import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from 'projects/admin/src/enums/urls';

@Injectable({
  providedIn: 'root'
})
export class ViewStudentsService {
  constructor(private http:HttpClient) { }

  getStudents(first:number,rows:number,semester:number,query:string){
    let branch_id = JSON.parse(localStorage.getItem('userInfo')||'{}').branch
    return this.http.get<any>(URLS.BASE_URL + '/read/students?branch_id='+branch_id+'&rows='+rows+'&first='+first+'&semester='+semester+'&query='+query+'&status=-1');  
  }

  getAttendedTests(usn:string){
    return this.http.get<any>(URLS.BASE_URL + '/read/attended_tests?usn='+usn);
  }
  
  getTopicScore(usn:string){
    return this.http.get<any>(URLS.BASE_URL + '/read/topic_score?usn='+usn);  
  }
}
