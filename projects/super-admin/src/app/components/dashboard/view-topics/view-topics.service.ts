import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from 'projects/admin/src/enums/urls';

@Injectable({
  providedIn: 'root'
})
export class ViewTopicsService {

  constructor(private http:HttpClient) { }

  getTopics(){
    return this.http.get<any>(URLS.BASE_URL + '/read/topics_info');  
  }

  addTopic(body:any){
    return this.http.post<any>(URLS.BASE_URL + '/create/topic',body);
  }

  updateTopic(body:any){
    return this.http.patch<any>(URLS.BASE_URL + '/update/update_topic',body);
  }
  
  deleteTopic(topic_id:any){
    return this.http.delete<any>(URLS.BASE_URL + '/delete/delete_topic?topic_id='+ topic_id);  
  }

}
