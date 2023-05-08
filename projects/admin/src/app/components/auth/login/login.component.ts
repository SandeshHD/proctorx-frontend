import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  constructor(private authService: AuthService,private router:Router,private messageService:MessageService){}

  onSubmit(){
    this.authService.authenticate(this.form.value).subscribe((data:any)=>{
      localStorage.setItem('userInfo',JSON.stringify(data))
        this.router.navigate([''])
    },(err:HttpErrorResponse)=>{
      if(err.status === 404){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials' })
      }else if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
      }
      else if(err.status === 401){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Your account has not been verified yet. Please contact the admin' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }
}
