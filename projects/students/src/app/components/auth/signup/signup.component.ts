import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators,ValidatorFn,AbstractControl,ValidationErrors } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Message, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [AuthService]
})
export class SignupComponent {
  form = new FormGroup({
    name: new FormControl('',[Validators.required]),
    usn: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    mobile: new FormControl(null,[Validators.required,Validators.pattern("^[789][0-9]{9}$")]),
    branch: new FormControl(null,[Validators.required]),
    semester: new FormControl(1,[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$")]),
    cpassword: new FormControl('',[Validators.required],),
  });
  invalidForm=false;
  branches:any;
  constructor(private authService:AuthService,private messageService:MessageService, private router:Router){}

  ngOnInit(){
    this.form.controls.cpassword.valueChanges.subscribe(data=>{
      if(this.form.controls.password.value !== data){
        this.invalidForm = true
      }else
        this.invalidForm = false
    })
    this.getBranches()
  }

  getBranches() {
    this.authService.getBranches()
      .subscribe((data: any) =>  {
          this.branches = data
      });
  }
  
  onSubmit(){
    this.form.markAllAsTouched()
    this.form.markAsDirty()
    this.authService.createUser(this.form.value).subscribe((data:any)=>{
      this.router.navigate(['auth'])
    },(err:HttpErrorResponse)=>{
      if(err.status == 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'USN or Email already exists' })
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }
}
