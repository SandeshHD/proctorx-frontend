import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  @Input() notice!:any;
  visible = false

  readMore(){
    this.visible = true
  }
}
