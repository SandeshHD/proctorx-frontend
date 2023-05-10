import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from 'projects/admin/src/enums/urls';

@Injectable({
  providedIn: 'root'
})
export class ViewFacultiesService {
  constructor(private http:HttpClient) { }

  getFaculties(first:number,rows:number,branch_id:number,query:string,currentStatus:any){
    // let branch_id = JSON.parse(localStorage.getItem('userInfo')||'{}').branch
    return this.http.get<any>(URLS.BASE_URL + '/read/faculties?rows='+rows+'&first='+first+'&branch_id='+branch_id+'&status='+currentStatus+'&query='+query);  
  }

  getFacultyInfo(id:string){
    return this.http.get<any>(URLS.BASE_URL + '/read/faculty_info?id='+id);  
  }
  
  getBranches(){
    return this.http.get<any>(URLS.BASE_URL + '/read/branches');  
  }

  changeStatus(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/change_faculty_status',body);  
  }

  updateFaculty(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/update_faculty',body);  
  }
  
  deleteFaculty(id:string){
    return this.http.delete<any>(URLS.BASE_URL + '/delete/delete_faculty?id='+id);
  }

}
