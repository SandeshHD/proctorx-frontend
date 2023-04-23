import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  items:any;
  constructor(private route: Router){}
  ngOnInit(){
    this.items = [
      {
          label: 'Logout',
          icon: 'pi pi-lock-open',
          command: ()=>this.logout()
      },
    ];
  }

  logout(){
    this.route.navigate(['/auth'])
    localStorage.removeItem('userInfo')
  }

}
