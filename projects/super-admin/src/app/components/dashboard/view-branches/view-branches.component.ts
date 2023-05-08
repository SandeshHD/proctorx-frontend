import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ViewBranchesService } from './view-branches.service';

@Component({
  selector: 'app-view-branches',
  templateUrl: './view-branches.component.html',
  styleUrls: ['./view-branches.component.scss']
})
export class ViewBranchesComponent {
  totalRecords = 0;
  branches:any;
  form!:FormGroup;
  currentBranch = 0;
  createModal = false
  @ViewChild('table', {static: false}) paginator!: Paginator;

  constructor(private viewBranchesService:ViewBranchesService,private messageService:MessageService, private confirmationService:ConfirmationService){}

  ngOnInit(){
    this.getBranches()
    this.form = new FormGroup({
      branch_name: new FormControl(null,[Validators.required])
    })
  }
  getBranches(){
    this.viewBranchesService.getBranches().subscribe(response=>{
      this.branches = response
    },(err)=>{
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

  openCreateBranchModal(){
    this.createModal = true;
  }

  editBranch(branch:any){
    this.currentBranch = branch.branch_id
    this.form.controls['branch_name'].setValue(branch.branch_name)
    this.openCreateBranchModal()
  }

  deleteBranch(event:any, branch_id:any){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this branch?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.viewBranchesService.deleteBranch(branch_id).subscribe(result=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Branch deleted sucessfully' })
          let idx = this.branches.findIndex((b:any)=> b.branch_id == branch_id)
          this.branches.splice(idx,1)
        },(err)=>{
          if(err.status === 404){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
          }else if(err.status === 400){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete branch' })
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
          }
        })
      },
      reject: () => {}
    });

  }

  closeModal(){
    this.currentBranch = 0
    this.form.controls['branch_name'].setValue(null)
  }

  submitForm(){
    this.form.markAllAsTouched()
    this.form.markAsDirty()
    if(this.form.valid){
      if(this.currentBranch===0){
        this.viewBranchesService.addBranch(this.form.value).subscribe(response=>{
          this.getBranches()
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Branch added successfully!' })
          this.createModal = false;
          this.form.reset()
        },(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create branch. Please try again' })
        })
      }else{
        const body = {
          ...this.form.value,
          branch_id : this.currentBranch
        }
        this.viewBranchesService.updateBranch(body).subscribe(response=>{
          this.getBranches()
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
