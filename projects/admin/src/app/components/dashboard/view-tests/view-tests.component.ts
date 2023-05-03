import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ViewTestsService } from './view-tests.service';

@Component({
  selector: 'app-view-tests',
  templateUrl: './view-tests.component.html',
  styleUrls: ['./view-tests.component.scss']
})
export class ViewTestsComponent {
  tests:any;
  results:any;
  query = ''
  totalRecords = 0;
  totalStudents = 0;
  visible = false;
  testResultVisible = false;
  status = [
    {
      label:'All',
      value:'all'
    },
    {
      label:'Enabled',
      value:'enabled'
    },
    {
      label:'Disabled',
      value:'disabled'
    }
  ]
  questionSet:any;
  show = 'all'
  currentTest:any;
  @ViewChild('table', {static: false}) paginator!: Paginator;

  constructor(private router:Router,private viewTestsService: ViewTestsService,private confirmationService:ConfirmationService,private messageService:MessageService){}
  
  getTests(first:number,rows:number){
    this.viewTestsService.getTests(first,rows,this.show,this.query).subscribe(response=>{
      this.tests = response
      this.totalRecords = (response && response.length >0) ?response[0]['total_records']:0;
    })
  }

  paginationHandler(event:any){
    this.getTests(event.first,event.rows)
  }

  editTest(id:number){
    this.router.navigate(['/edit-test',id])
  }

  showTest(currentTest:any){
    this.currentTest = currentTest
    this.viewTestsService.getTestQuestions(currentTest.id).subscribe(response=>{
      this.questionSet = response
    })
    this.visible = true;
  }


  showResult(event:any,test:any){
    this.currentTest = test
    if(test.status==='enabled'){
      this.confirmationService.confirm({
        target: event.target,
        message: 'Are you sure that you want to disable the test and view result?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.changeStatus(this.currentTest,true)
          this.testResultVisible = true
        },
        reject: () => {}
      });
    }else{
      this.testResultVisible = true;
      // this.getStudentsPerformance(test.id,0,5)
    }
  }

  getStudentsPerformance(id:number,first:number,rows:number){
    this.viewTestsService.getStudentsResults(id,first,rows).subscribe(response=>{
      this.results = response
      this.totalStudents = (response && response.length >0) ?response[0]['total_records']:0;
      this.testResultVisible = true
    },err=>{
      if(err.status === 404){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
      }else if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load results. Please try again' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }

  changeStatus(test:any,view = false){
    let status = test.status === 'enabled'?'disabled':'enabled'
    const body = {
      test_id: test.id,
      status
    }
    this.viewTestsService.changeStatus(body).subscribe(response=>{
      this.getTests(0,5)
      if(view){
        this.getStudentsPerformance(this.currentTest.id,0,5)
      }
      else{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Status changed successfully' })
      }
    },err=>{
      if(err.status === 404){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
      }else if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to change the status. Please try again' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }

  studentPaginationHandler(event:any){
    this.getStudentsPerformance(this.currentTest.id,event.first,event.rows)
  }

  changeFilter(event:any){
    this.show = event.value
    this.getTests(0,5)
    this.paginator.first = 0
  }

  searchTest(event:any){
    this.query = event.target.value
    this.getTests(0,5)
  }
  // applyFilterGlobal($event:any, stringVal:any) {
  //   this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  // }
}
