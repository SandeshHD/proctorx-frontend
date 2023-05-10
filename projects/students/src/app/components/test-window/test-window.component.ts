import { Component, HostListener, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { QuestionComponent } from './question/question.component';
import { TestWindowService } from './test-window.service';

@Component({
  selector: 'app-test-window',
  templateUrl: './test-window.component.html',
  styleUrls: ['./test-window.component.scss']
})
export class TestWindowComponent {
  testData:any;
  testId:any;
  currentIndex = 0;
  currentQuestion = null
  duration:any;
  timeLeft:any=0;
  elem:any;
  violationCount = 0;
  timer:any;
  @ViewChild(QuestionComponent) qc!:QuestionComponent;
  timeString = '00:00:00'
  constructor(private testWindowService:TestWindowService, private activatedRoute:ActivatedRoute,private router:Router,private messageService:MessageService){}

  ngOnInit(){
    this.elem = document.documentElement
    this.activatedRoute.params.subscribe(params=>{
      this.testId = params['id']
      this.testWindowService.getTestInfo(this.testId).subscribe(response=>{
        this.duration = response['duration']
        this.timeLeft = this.duration
        this.timeString = this.getTimeString(this.timeLeft)
        this.timer = setInterval(()=>{
          this.timeLeft-=1
          this.timeString = this.getTimeString(this.timeLeft)
          if(this.timeLeft===0){
            clearInterval(this.timer)
            this.submitTest()
          }
        },1000)
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

  @HostListener('document:visibilitychange', ['$event'])
  visibilitychange() {
    if(document.visibilityState==='hidden'){
      this.violationCount++;
      this.messageService.add({key:'warning-key', severity: 'error', summary: 'Violation!',sticky:true, detail: 'Switching tabs during the test is a violation and may result in disqualification.' })
      if(this.violationCount === 2)
      this.submitTest()
    }
  }


  getTimeString(seconds:number){
    return new Date(seconds * 1000).toISOString().substring(11, 19)
  }

  submitTest(){
    const body = {
      test_id: this.testId,
      duration: this.duration - this.timeLeft
    }
    this.testWindowService.submitTest(body).subscribe(response=>{
      this.router.navigate(['/submission'])
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
  }
}
