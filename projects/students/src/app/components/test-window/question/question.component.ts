import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TestWindowService } from '../test-window.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Output() onFinish:EventEmitter<any>= new EventEmitter<any>();;
  timeLeft:any;
  timer:any;
  question:any;
  currentIndex:number = -1;
  missedQuestions = 0;
  answeredQuestions = 0;
  savedInServer = 0;
  options:any;
  testId!:number;
  tests:any;
  totalQuestions:number = 0
  questionsStatus:any=[];
  usn:any;
  elem:any;
  answerForm!: FormGroup;
  constructor(private testWindowService:TestWindowService,private activatedRoute:ActivatedRoute,private messageService:MessageService,@Inject(DOCUMENT) private document: any){}

  ngOnInit(){
    this.usn = JSON.parse(localStorage.getItem('userInfo')||'{}').usn
    this.answerForm = new FormGroup({
      "user_id": new FormControl(this.usn),
      "question_id": new FormControl(),
      "test_id": new FormControl(),
      "answer":new FormControl(null),
    })

    this.activatedRoute.params.subscribe(params=>{
      this.testId = params['id']
      this.answerForm.controls['test_id'].setValue(this.testId)
      this.testWindowService.getTestData(params['id']).subscribe(response =>{
        this.tests = response
        this.totalQuestions = this.tests.length
        this.questionsStatus = this.tests.map((test:any)=>'')
        this.questionsStatus[this.currentIndex+1] = 'current' 
        this.getNextQuestion()
      },(err)=>{
        if(err.status === 404){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Test Not found' })
        }else if(err.status === 400){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
        }
      })
    })

  }


  getNextQuestion(){
    if(this.currentIndex < this.tests.length){
      if(this.answerForm.controls['answer'].value){
        this.submitAnswer()
        this.answerForm.reset()
      }else{
        if(this.currentIndex>=0){
          this.questionsStatus[this.currentIndex] = 'missed'
          this.missedQuestions+=1
        }
      }
      if(this.timer)
        clearInterval(this.timer)
      if(this.currentIndex < this.totalQuestions)
        ++this.currentIndex;

      if(this.currentIndex >= this.tests.length)
      return this.onFinish.emit();
      this.timeLeft = this.tests[this.currentIndex]?.time_limit
      this.timer = setInterval(()=>{
        this.timeLeft -=1 
        if(this.timeLeft === 0){
          clearInterval(this.timer)
          this.questionsStatus[this.currentIndex+1] = 'current'
          this.getNextQuestion()
        } 
      },1000)
      this.question = this.tests[this.currentIndex] 
      this.options = this.question?.option_set.split(',')
      this.answerForm.patchValue({user_id:this.usn,question_id:this.question.question_id,test_id:this.testId})   
    }else{
      this.timeLeft = 0
    }
  }
  
  submitAnswer(){
    this.questionsStatus[this.currentIndex] = 'done'    
    this.questionsStatus[this.currentIndex+1] = 'current'
    this.answeredQuestions += 1
    const body = {
      ...this.answerForm.value,
      time_taken: this.tests[this.currentIndex]?.time_limit - this.timeLeft
    }
    this.timeLeft = 0
    this.testWindowService.patchQuestionScore(body).subscribe(response=>{
      this.savedInServer += 1
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question saved successfully' })
    },(err)=>{
      if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }
}
