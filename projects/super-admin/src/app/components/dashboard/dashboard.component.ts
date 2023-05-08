import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router:Router){}
  ngOnInit() {
    let branch_id = JSON.parse(localStorage.getItem('userInfo')||'{}').id
    if(!branch_id)
      this.router.navigate(['auth'])
  }

  logout(){
    this.router.navigate(['/auth'])
    localStorage.removeItem('userInfo')
  }
}
