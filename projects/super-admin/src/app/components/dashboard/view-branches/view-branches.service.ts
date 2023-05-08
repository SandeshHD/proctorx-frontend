import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from 'projects/admin/src/enums/urls';

@Injectable({
  providedIn: 'root'
})
export class ViewBranchesService {

  constructor(private http:HttpClient) { }

  getBranches(){
    return this.http.get<any>(URLS.BASE_URL + '/read/branches_info');  
  }

  addBranch(body:any){
    return this.http.post<any>(URLS.BASE_URL + '/create/branch',body);
  }

  updateBranch(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/update_branch',body);
  }
  
  deleteBranch(branch_id:any){
    return this.http.delete<any>(URLS.BASE_URL + '/delete/delete_branch?branch_id='+ branch_id);  
  }

}
