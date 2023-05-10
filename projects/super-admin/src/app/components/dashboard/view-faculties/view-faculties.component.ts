import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  visible = false;
  profileForm:any;
  totalRecords:number=0;
  updateModal = false;
  currentID:any;
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
    this.profileForm = new FormGroup({
      employee_id:new FormControl(null,[Validators.required]),
      name:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required]),
      branch:new FormControl(null,[Validators.required]),
    })
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

  openEditFacultyModal(event:any,id:string){
    this.viewFacultiesService.getFacultyInfo(id).subscribe(faculty=>{
      this.profileForm.setValue(faculty)
      this.currentID = id
      this.updateModal = true;
    })
  }

  updateFaculty(){
    this.profileForm.markAllAsTouched()
    this.profileForm.markAsDirty()
    if(this.profileForm.valid){
      const body = {
        ...this.profileForm.value,
        currentID: this.currentID
      }
      this.viewFacultiesService.updateFaculty(body).subscribe(data=>{
        this.getFaculties(0,5)
        this.updateModal = false
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Faculty updated successfully!' })
        this.currentID = null
      },(err)=>{
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update branch. Please try again' })
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all the required fields' })
    }
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
  
  applyFilterGlobal($event:any, stringVal:any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  
}
