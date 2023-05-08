import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ViewTopicsService } from './view-topics.service';

@Component({
  selector: 'app-view-topics',
  templateUrl: './view-topics.component.html',
  styleUrls: ['./view-topics.component.scss']
})

export class ViewTopicsComponent {
  totalRecords = 0;
  topics:any;
  form!:FormGroup;
  currentTopic = 0;
  createModal = false
  @ViewChild('table', {static: false}) paginator!: Paginator;

  constructor(private viewTopicsService:ViewTopicsService,private messageService:MessageService, private confirmationService:ConfirmationService){}

  ngOnInit(){
    this.getTopics()
    this.form = new FormGroup({
      topic_name: new FormControl(null,[Validators.required])
    })
  }
  getTopics(){
    this.viewTopicsService.getTopics().subscribe(response=>{
      this.topics = response
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

  openCreateTopicModal(){
    this.createModal = true;
  }

  editTopic(topic:any){
    this.currentTopic = topic.topic_id
    this.form.controls['topic_name'].setValue(topic.topic_name)
    this.openCreateTopicModal()
  }

  deleteTopic(event:any, topic_id:any){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this topic?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.viewTopicsService.deleteTopic(topic_id).subscribe(result=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Topic deleted sucessfully' })
          let idx = this.topics.findIndex((t:any)=> t.topic_id == topic_id)
          this.topics.splice(idx,1)
        },(err)=>{
          if(err.status === 404){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
          }else if(err.status === 400){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete topic' })
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
    this.currentTopic = 0
    this.form.controls['topic_name'].setValue(null)
  }

  submitForm(){
    this.form.markAllAsTouched()
    this.form.markAsDirty()
    if(this.form.valid){
      if(this.currentTopic===0){
        this.viewTopicsService.addTopic(this.form.value).subscribe(response=>{
          this.getTopics()
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Topic added successfully!' })
          this.createModal = false;
          this.form.reset()
        },(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create topic. Please try again' })
        })
      }else{
        const body = {
          ...this.form.value,
          topic_id : this.currentTopic
        }
        this.viewTopicsService.updateTopic(body).subscribe(response=>{
          this.getTopics()
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Topic updated successfully!' })
          this.createModal = false;
          this.form.reset()
        },(err)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update topic. Please try again' })
        })
      }
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all the required fields' })
    }
  }
}

