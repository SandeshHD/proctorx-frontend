import { Component,EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  @Input() test:any;
  @Output() openModal: EventEmitter<number> = new EventEmitter();
  openTestModal(){
    this.openModal.emit(this.test.id)
  }
}
