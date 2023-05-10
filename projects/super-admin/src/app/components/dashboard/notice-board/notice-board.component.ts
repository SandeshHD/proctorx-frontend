import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { NoticeBoardService } from './notice-board.service';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.scss']
})

export class NoticeBoardComponent {
  totalRecords = 0;
  notices:any;
  searchValue = ''
  branches: any = [{branch_id:0,branch_name:"All"}];
  selectedBranch = 0;

  @ViewChild('table', {static: false}) paginator!: Paginator;

  constructor(private noticeBoardService:NoticeBoardService,private messageService:MessageService, private confirmationService:ConfirmationService){}

  ngOnInit(){
    this.getBranches()
  }
  getNotices(first:number,rows:number){
    this.noticeBoardService.getNotices(first,rows,this.searchValue,this.selectedBranch).subscribe(response=>{
      this.notices = response
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
    this.getNotices(event.first,event.rows)
  }

  getBranches(){
    this.noticeBoardService.getBranches().subscribe(response =>{
      this.branches = [...this.branches,...response]
    })
  }

  changeBranch(event:any){
    this.selectedBranch = event.value
    this.getNotices(0,5)
    this.paginator.first = 0
  }

  deleteNotice(event:any, notice_id:any){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this notice?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.noticeBoardService.deleteNotice(notice_id).subscribe(result=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Notice deleted sucessfully' })
          let idx = this.notices.findIndex((b:any)=> b.id == notice_id)
          this.notices.splice(idx,1)
        },(err)=>{
          if(err.status === 404){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
          }else if(err.status === 400){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete notice' })
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
          }
        })
      },
      reject: () => {}
    });

  }

  searchNotice(event:any){
    this.searchValue = event.target.value
    this.getNotices(0,5)
    this.paginator.first = 0
  }
}
