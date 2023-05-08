import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ViewFacultiesService } from './view-faculties.service';

@Component({
  selector: 'app-view-faculties',
  templateUrl: './view-faculties.component.html',
  styleUrls: ['./view-faculties.component.scss']
})
export class ViewFacultiesComponent {
  faculties:any;
  selectedBranch = 0;
  searchValue = '';
  visible = false
  totalRecords:number=0;
  topicScore:any;
  topicCount = 0;
  currentStatus:any = -1;
  status: any = [
    {
      label:'All',
      value:-1
    },
    {
      label:'Active',
      value:1
    },
    {
      label:'Inactive',
      value:0
    },
  ];
  branches: any = [{branch_id:0,branch_name:"All"}];
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
    this.getBranches()
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

  constructor(private viewFacultiesService:ViewFacultiesService,private messageService:MessageService,private confirmationService:ConfirmationService){}
  getFaculties(first:number,rows:number){
    this.viewFacultiesService.getFaculties(first,rows,this.selectedBranch,this.searchValue,this.currentStatus).subscribe(response=>{
      this.faculties = response
      this.totalRecords = (response && response.length>0)?response[0]['total_records']:0;
    })
  }

  getBranches(){
    this.viewFacultiesService.getBranches().subscribe(response =>{
      this.branches = [...this.branches,...response]
    })
  }


  changeStatus(faculty:any){
    let status = !faculty.verified
    const body = {
      faculty_id: faculty.id,
      status
    }
    this.viewFacultiesService.changeStatus(body).subscribe(response=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: body.status?'Faculty activated successfully':'Faculty deactivated successfully' })
      this.getFaculties(0,5)
    },(err:any)=>{
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

  deleteFaculty(event:any,id:string){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this faculty?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.viewFacultiesService.deleteFaculty(id).subscribe(response =>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Faculty deleted sucessfully' })
          let idx = this.faculties.findIndex((fac:any)=> fac.id == id)
          this.faculties.splice(idx,1)
        },(err)=>{
          if(err.status === 404){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
          }else if(err.status === 400){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete Faculty' })
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
          }
        })
      },
      reject: () => {}
    });
  }

  paginationHandler(event:any){
    this.getFaculties(event.first,event.rows)
  }
  
  changeBranch(event:any){
    this.selectedBranch = event.value
    this.getFaculties(0,5)
    this.paginator.first = 0
  }
  
  approvalStatus(event:any){
    this.currentStatus = event.value
    this.getFaculties(0,5)
    this.paginator.first = 0
  }
  
  searchFaculty(event:any){
    this.searchValue = event.target.value
    this.getFaculties(0,5)
    this.paginator.first = 0
  }

  openFacultyDetails(usn:string){
    this.getTopicScore(usn)
    this.getAttendedTests(usn)
    this.visible =true
  }
  
  applyFilterGlobal($event:any, stringVal:any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  getAttendedTests(usn:string){
    this.viewFacultiesService.getAttendedTests(usn).subscribe((data:any)=>{
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
    this.viewFacultiesService.getTopicScore(usn).subscribe((data:any)=>{
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
