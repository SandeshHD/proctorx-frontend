import { DOCUMENT } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
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
  timer:any;
  @ViewChild(QuestionComponent) qc!:QuestionComponent;
  timeString = '00:00:00'
  constructor(private testWindowService:TestWindowService, private activatedRoute:ActivatedRoute,private router:Router,private messageService:MessageService,@Inject(DOCUMENT) private document: any){}

  ngOnInit(){
    this.elem = document.documentElement
    this.openFullscreen()
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

    // this.document.addEventListener("keydown",(event:any)=>{
    //   if(event.key === 'Escape' || event.key === 'F11'){
    //     event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    //     console.log(event.key)
    //   }
    // })
    
  }


  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
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
      this.closeFullscreen();
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
