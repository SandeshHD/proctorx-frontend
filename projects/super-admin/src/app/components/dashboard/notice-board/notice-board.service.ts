import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from 'projects/admin/src/enums/urls';

@Injectable({
  providedIn: 'root'
})
export class NoticeBoardService {

  constructor(private http:HttpClient) { }

  getNotices(first:number,rows:number,query:string,branch:number){
    return this.http.get<any>(URLS.BASE_URL + '/read/all_notices?rows='+rows+'&first='+first+'&query='+query+'&branch_id='+branch);  
  }

  getBranches(){
    return this.http.get<any>(URLS.BASE_URL + '/read/branches');  
  }

  addNotice(body:any){
    let faculty_id = JSON.parse(localStorage.getItem('userInfo')||'{}').id
    return this.http.post<any>(URLS.BASE_URL + '/create/notice',{...body,faculty_id});
  }

  updateNotice(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/update_notice',body);
  }
  
  deleteNotice(notice_id:any){
    return this.http.delete<any>(URLS.BASE_URL + '/delete/delete_notice?notice_id='+ notice_id);  
  }

}
