import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { ViewQuestionsService } from './view-questions.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent {
  totalRecords = 0;
  questions:any;
  selectedTopic:any=0;
  topicSetFilter:any;
  searchValue = ''
  difficulty = [
    {
      label:'Easy',
      value: 'easy'
    },
    {
      label: 'Medium',
      value: 'medium'
    },
    {
      label: 'Hard',
      value: 'hard'
    }
  ]
  @ViewChild('table', {static: false}) paginator!: Paginator;

  constructor(private questionsService:ViewQuestionsService,private messageService:MessageService, private confirmationService:ConfirmationService){}

  ngOnInit(){
    this.getTopics()
  }
  getQuestions(first:number,rows:number){
    this.questionsService.getQuestions(first,rows,this.selectedTopic,this.searchValue).subscribe(response=>{
      this.questions = response
      this.totalRecords = (response && response.length>0)?response[0]['total_records']:0;
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

  getTopics(){
    this.questionsService.getTopics().subscribe((response:any)=>{
      this.topicSetFilter = [
        {
          topic_id:0,
          topic_name:'All'
        },
        ...response
      ]
    })
  }

  paginationHandler(event:any){
    this.getQuestions(event.first,event.rows)
  }

  searchQuestion(event:any){
    this.searchValue = event.target.value
    this.getQuestions(0,5)
    this.paginator.first = 0
  }

  changeFilter(event:any){
    this.selectedTopic = event.value
    this.getQuestions(0,5)
    this.paginator.first = 0
  }

  deleteQuestion(event:any, question_id:any){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this question?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.questionsService.deleteQuestion(question_id).subscribe(result=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question deleted sucessfully' })
          let idx = this.questions.findIndex((q:any)=> q.question_id == question_id)
          this.questions.splice(idx,1)
        },(err)=>{
          if(err.status === 404){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
          }else if(err.status === 400){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete question' })
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
          }
        })
      },
      reject: () => {}
    });

  }

}
