import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {
  data: any;
  skillsOptions: any;
  performance: any;
  topicScore:any;
  noticeboard:any;
  leaderboard:any;
  stats:any
  performanceOptions: any;

  constructor(private dashboardService: DashboardService,private messageService:MessageService){}
  ngOnInit() {
    this.getTopicScore()
    this.getUserStats()
    this.getAttendedTests()
    this.getLeaderBoard()
    this.getNoticeBoard()
    this.skillsOptions = {
      responsive:true,
      aspectRatio:1/0.8,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    };

    this.performanceOptions = {
      maintainAspectRatio: true,
      aspectRatio:1/0.5,
      responsive: false,
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
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
          beginAtZero:true,
          max:100
        },
      },
    };
  }

  getAttendedTests(){
    this.dashboardService.getAttendedTests().subscribe((data:any)=>{
      // this.attendedTests = data
      const labels = data.map((test:any) => test.test_name)
      const score = data.map((test:any) => (test.score/test.marks)*100)
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

  getTopicScore(){
    this.dashboardService.getTopicScore().subscribe((data:any)=>{
      const score = data.map((topic:any)=> topic.score)
      const topic_name = data.map((topic:any)=> topic.topic_name)
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
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials' })
      }else if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }

  getLeaderBoard(){
    this.dashboardService.getLeaderBoard().subscribe((data:any)=>{
      this.leaderboard = data
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

  getUserStats(){
    this.dashboardService.getUserStats().subscribe((data:any)=>{
      this.stats = data
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
  
  getNoticeBoard(){
    this.dashboardService.getNoticeBoard().subscribe((data:any)=>{
      this.noticeboard = data
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


}
