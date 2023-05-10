import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ViewStudentsService } from './view-students.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss']
})
export class ViewStudentsComponent {
  students:any;
  selectedSemester = 0;
  searchValue = '';
  visible = false
  totalRecords:number=0;
  topicScore:any;
  topicCount = 0;
  performanceCount = 0;
  performance:any;
  attendedTests:any;
  skillsOptions:any;
  performanceOptions:any;
  @ViewChild('table', {static: false}) paginator!: Paginator;
  @ViewChild('dt1') dt:any;

  semester = [
    {
      label: 'All',
      value:0
    },
    {
      label: '1',
      value:1
    },
    {
      label: '2',
      value:2
    },
    {
      label: '3',
      value:3
    },
    {
      label:'4',
      value:4
    },
    {
      label:'5',
      value:5
    },
    {
      label:'6',
      value:6
    },
    {
      label:'7',
      value:7
    },
    {
      label:'8',
      value:8
    },
  ]
  
  ngOnInit(){
    this.skillsOptions = {
      responsive:true,
      aspectRatio:1/0.6,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };

    this.performanceOptions = {
      responsive: false,
      aspectRatio:1/0.6,
      plugins: {
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          }
        },
        y: {
          beginAtZero:true,
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
          max: 100
        },
      },
    };
    
  }

  constructor(private viewStudentsService:ViewStudentsService,private messageService:MessageService){}
  getStudents(first:number,rows:number){
    this.viewStudentsService.getStudents(first,rows,this.selectedSemester,this.searchValue).subscribe(response=>{
      this.students = response
      this.totalRecords = (response && response.length>0)?response[0]['total_records']:0;
    },(err)=>{
      if(err.status === 404){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
      }else if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad request' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }

  paginationHandler(event:any){
    this.getStudents(event.first,event.rows)
  }

  changeFilter(event:any){
    this.selectedSemester = event.value
    this.getStudents(0,5)
    this.paginator.first = 0
  }
  
  searchStudent(event:any){
    this.searchValue = event.target.value
    this.getStudents(0,5)
    this.paginator.first = 0
  }

  openStudentDetails(usn:string){
    this.getTopicScore(usn)
    this.getAttendedTests(usn)
    this.visible =true
  }
  
  applyFilterGlobal($event:any, stringVal:any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getAttendedTests(usn:string){
    this.viewStudentsService.getAttendedTests(usn).subscribe((data:any)=>{
      const labels = data.map((test:any) => test.test_name)
      const score = data.map((test:any) => (test.score/test.marks)*100)
      // labels.splice(0,0,'')
      // score.splice(0,0,0)
      this.attendedTests = data
      this.performanceCount = score.length
      this.performance = {
        labels: labels,
        datasets: [
          {
            label: 'Test performance',
            data: score,
            fill: false,
            borderColor: '#42A5F5',
            tension: 0.4,
          }
        ],
      };
    },err=>{
      if(err.status === 404){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials' })
      }else if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }

  getTopicScore(usn:string){
    this.viewStudentsService.getTopicScore(usn).subscribe((data:any)=>{
      const score = data.map((topic:any)=> topic.score)
      const topic_name = data.map((topic:any)=> topic.topic_name)
      this.topicCount = score.length
      this.topicScore = {
        labels:topic_name,
        datasets:[{
          data: score,
          backgroundColor: [
            '#FF6384',
            '#C9CBCF',
            '#9966FF',
            '#36A2EB',
            '#4BC0C0',
            '#FF8863',
            '#FFCD56',
            '#FF9F40',
          ],
        }]
      }
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
}
