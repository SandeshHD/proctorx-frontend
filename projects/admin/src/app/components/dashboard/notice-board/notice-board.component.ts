import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  form!:FormGroup;
  currentNotice = 0;
  createModal = false
  searchValue = ''
  @ViewChild('table', {static: false}) paginator!: Paginator;

  constructor(private noticeBoardService:NoticeBoardService,private messageService:MessageService, private confirmationService:ConfirmationService){}

  ngOnInit(){
    this.getNotices(0,5)
    this.form = new FormGroup({
      notice_heading: new FormControl(null,[Validators.required]),
      notice: new FormControl(null,[Validators.required])
    })
  }
  getNotices(first:number,rows:number){
    this.noticeBoardService.getNotices(first,rows,this.searchValue).subscribe(response=>{
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

  openCreateNoticeModal(){
    this.createModal = true;
  }

  paginationHandler(event:any){
    this.getNotices(event.first,event.rows)
  }

  editNotice(notice:any){
    this.currentNotice = notice.id
    this.form.patchValue(notice)
    this.openCreateNoticeModal()
  }

  deleteNotice(event:any, notice_id:any){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this notice?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.noticeBoardService.deleteNotice(notice_id).subscribe(result=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Notice deleted sucessfully' })
          let idx = this.notices.findIndex((b:any)=> b.notice_id == notice_id)
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

  closeModal(){
    this.currentNotice = 0
    // this.form.controls['branch_name'].setValue(null)
  }

  submitForm(){
    this.form.markAllAsTouched()
    this.form.markAsDirty()
    if(this.form.valid){
      if(this.currentNotice===0){
        this.noticeBoardService.addNotice(this.form.value).subscribe(response=>{
          this.getNotices(0,5)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Notice added successfully!' })
          this.createModal = false;
          this.form.reset()
        },(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create notice. Please try again' })
        })
      }else{
        console.log(this.currentNotice)
        const body = {
          ...this.form.value,
          notice_id : this.currentNotice
        }
        this.noticeBoardService.updateNotice(body).subscribe(response=>{
          this.getNotices(0,5)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Branch updated successfully!' })
          this.createModal = false;
          this.form.reset()
        },(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update branch. Please try again' })
        })
      }
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all the required fields' })
    }
  }
}
