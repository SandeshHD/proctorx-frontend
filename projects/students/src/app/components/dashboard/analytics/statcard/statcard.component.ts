import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-statcard',
  templateUrl: './statcard.component.html',
  styleUrls: ['./statcard.component.scss']
})
export class StatcardComponent {
  @Input() color!:string;
  @Input() label!:string;
  @Input() value!:string;
}
