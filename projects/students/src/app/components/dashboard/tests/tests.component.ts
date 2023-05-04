import { Component,ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
  providers: [DashboardService]
})

export class TestsComponent {
  @ViewChild('dt1') dt:any;
  tests:any;
  testShow = null;
  constructor(private dashboardService: DashboardService,private messageService: MessageService){}

  ngOnInit(){
    this.getUpcomingTests()
    this.getAttendedTests()
  }

  attendedTests: any = []
  
  getUpcomingTests(){
    this.dashboardService.getUpcomingTests().subscribe((data:any)=>{
      this.tests = data
    },err=>{
      if(err.status === 404){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
      }else if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }

  getAttendedTests(){
    this.dashboardService.getAttendedTests().subscribe((data:any)=>{
      this.attendedTests = data
    },err=>{
      if(err.status === 404){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
      }else if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }

  closeModal(refresh:boolean){
    if(refresh){
      setTimeout(() => {
        this.getUpcomingTests()
      }, 50);
    }
    this.testShow = null
  }

  applyFilterGlobal($event:any, stringVal:any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  openModal(id:any){
    this.testShow = this.tests.find((test:any) => test.id === id); 
  }
}
