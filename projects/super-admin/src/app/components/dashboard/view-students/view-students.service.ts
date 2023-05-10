import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from 'projects/admin/src/enums/urls';

@Injectable({
  providedIn: 'root'
})
export class ViewStudentsService {
  constructor(private http:HttpClient) { }

  getStudents(first:number,rows:number,branch_id:number, semester:number,currentStatus:any,query:string){
    // let branch_id = JSON.parse(localStorage.getItem('userInfo')||'{}').branch
    return this.http.get<any>(URLS.BASE_URL + '/read/students?rows='+rows+'&first='+first+'&branch_id='+branch_id+'&semester='+semester+'&status='+currentStatus+'&query='+query);  
  }

  getAttendedTests(usn:string){
    return this.http.get<any>(URLS.BASE_URL + '/read/attended_tests?usn='+usn);
  }
  
  getStudentInfo(usn:string){
    return this.http.get<any>(URLS.BASE_URL + '/read/student_info?usn='+usn);  
  }

  getTopicScore(usn:string){
    return this.http.get<any>(URLS.BASE_URL + '/read/topic_score?usn='+usn);  
  }
  
  getBranches(){
    return this.http.get<any>(URLS.BASE_URL + '/read/branches');  
  }
  
  changeStatus(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/change_student_status',body);  
  }
  
  updateStudent(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/update_student',body);  
  }

  deleteStudent(usn:string){
    return this.http.delete<any>(URLS.BASE_URL + '/delete/delete_student?usn='+usn);
  }


}
