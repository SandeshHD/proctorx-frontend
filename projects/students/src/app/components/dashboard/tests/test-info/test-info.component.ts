import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DashboardService } from '../../dashboard.service';
@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.scss'],
  providers: [DashboardService]
})
export class TestInfoComponent {
  @Input() test:any;
  @Output() onModalClose: EventEmitter<boolean> = new EventEmitter();
  testParts:any;
  timeRemaining:any="00d:00h:00m:00s";
  timer:any;
  elem: any;
  constructor(private dashboardService:DashboardService,private messageService:MessageService,private router:Router){}
  closeModal(refresh:boolean){
    clearInterval(this.timer)
    this.onModalClose.emit(refresh);
  }
  
  ngOnInit(){
    this.countdownTimeStart(this.test.deadline)    

    // this.dashboardService.getTestParts(this.test.test_id).subscribe((data:any)=>{
    //   this.testParts = data
    // },(err)=>{
    //   if(err.status === 404){
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Test not found' })
    //   }else if(err.status === 400){
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
    //   }
    //   else{
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
    //   }
    // })
  }

  countdownTimeStart(deadline:any){
    var countDownDate:any = new Date(deadline);
    this.timer = setInterval(() => {
      var currentDate:any = new Date()
        var d = Math.abs(countDownDate- currentDate) / 1000;                           // delta
        var r:any = {};                                                                // result
        var s:any = {                                                                  // structure
            // year: 31536000,
            // month: 2592000,
            // week: 604800, // uncomment row to ignore
            day: 86400,   // feel free to add your own row
            hour: 3600,
            minute: 60,
            second: 1
        };

        Object.keys(s).forEach(function(key){
            r[key] = Math.floor(d / s[key]);
            d -= r[key] * s[key];
        });
        this.timeRemaining =r.day + "d "+ r.hour + "h: "
        + r.minute + "m: " + r.second + "s ";
        
    }, 1000);
    }

    startTest(id:any){
      const body = {
        test_id : id
      }
      this.dashboardService.startTest(body).subscribe((response:any)=>{
        this.router.navigate(['/test',id])
      })
    }
}
