import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../../../enums/urls';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getUpcomingTests(){
    let branch_id = JSON.parse(localStorage.getItem('userInfo')||'{}').branch
    return this.http.get<any>(URLS.BASE_URL + '/read/upcomingTests?branch_id='+branch_id);
  }
  
  getTestParts(test_id: number){
    return this.http.get<any>(URLS.BASE_URL + '/read/test_parts?test_id='+test_id);
  }
  
  getAttendedTests(){
    let usn = JSON.parse(localStorage.getItem('userInfo')||'{}').usn
    return this.http.get<any>(URLS.BASE_URL + '/read/attended_tests?usn='+usn);
  }
  
  getUserStats(){
    let usn = JSON.parse(localStorage.getItem('userInfo')||'{}').usn
    return this.http.get<any>(URLS.BASE_URL + '/read/user_stats?usn='+usn);
  }
  
  getTopicScore(){
    let usn = JSON.parse(localStorage.getItem('userInfo')||'{}').usn
    return this.http.get<any>(URLS.BASE_URL + '/read/topic_score?usn='+usn);  
  }
  
  getLeaderBoard(){
    return this.http.get<any>(URLS.BASE_URL + '/read/leaderboard');  
  }

  getNoticeBoard(){
    return this.http.get<any>(URLS.BASE_URL + '/read/noticeboard');  
  }

}
