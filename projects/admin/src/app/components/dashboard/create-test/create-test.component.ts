import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { CreateTestService } from './create-test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent {
  visible:boolean = false;
  form!:FormGroup;
  questions:any;
  totalRecords:any;
  topics:any;
  faculty_id:any;
  testForm:any;
  today:any;
  questionsBeforeUpdate:any = [];
  questionsList:any = [];
  questionsIdList:any = [];
  searchValue = ''
  editId:any;
  topicSetFilter:any;
  selectQuestion = false;
  difficulty = [
    {
      label:'Easy',
      value: 'easy'
    },
    {
      label: 'Medium',
      value: 'medium'
    },
    {
      label: 'Hard',
      value: 'hard'
    }
  ]
  topicValue:number = 0;
  @ViewChild('table', {static: false}) paginator!: Paginator;


  constructor(private router:Router,private createTestService: CreateTestService, private messageService: MessageService,private activatedRoute: ActivatedRoute,private confirmationService:ConfirmationService){}

  ngOnInit(){
    this.faculty_id = JSON.parse(localStorage.getItem('userInfo')||'{}').id
    this.today = new Date();
    this.getTopics()
    this.testForm = new FormGroup({
      test_name : new FormControl(null,[Validators.required]),
      deadline:new FormControl(null,[Validators.required]),
      faculty_id: new FormControl(this.faculty_id)
    })

    this.form = new FormGroup({
      question_title:new FormControl(null,[Validators.required]),
      option_set: new FormArray([],Validators.required),
      correct_answer: new FormControl(null,[Validators.required]),
      points: new FormControl(0,[Validators.required]),
      difficulty_level: new FormControl('easy',[Validators.required]),
      time_limit: new FormControl(0,[Validators.required]),
      created_by: new FormControl(this.faculty_id),
      topics: new FormArray([],[Validators.required])
    })
    this.editId = this.activatedRoute.snapshot.params['id'];
    if(this.editId){
      this.getTestInfoById()
      this.getAllQuestionsById()
    }
  }

  get optionSet() {
    return this.form.get('option_set') as FormArray;
  }
  
  get topicSet() {
    return this.form.get('topics') as FormArray;
  }

  deleteTest(event:any){
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure that you want to delete this test?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.createTestService.deleteTest(this.editId).subscribe(result=>{
          this.router.navigate(['create-test'])
          setTimeout(()=>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Test deleted sucessfully' })
          },50)
        },(err)=>{
          if(err.status === 404){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
          }else if(err.status === 400){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete test' })
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
          }
        })
      },
      reject: () => {}
    });
  }
  getTestInfoById(){
    this.createTestService.getTestInfoById(this.editId).subscribe((test:any)=>{
      if(test){
        this.testForm.patchValue({
          test_name : test.test_name,
          deadline: new Date(test.deadline)
        })
        this.testForm.updateValueAndValidity()
      }else{
        this.router.navigate(['create-test'])
        setTimeout(()=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Test Not found' })
        },50)
      }
    })
  }
  
  getAllQuestionsById(){
    this.createTestService.getQuestionsByTestId(this.editId).subscribe((questions:any)=>{
      if(questions?.length>0){
        this.questionsList = questions;
        this.questionsBeforeUpdate = this.questionsList.map((question:any)=> question.question_id)
        this.questionsIdList =this.questionsBeforeUpdate.slice()
      }
    })
  }

  getTopics(){
    this.createTestService.getTopics().subscribe((response:any)=>{
      this.topics = response
      this.topicSetFilter = [
        {
          topic_id:0,
          topic_name:'All'
        },
        ...this.topics
      ]
    })
  }

  addOption() {
    this.optionSet.push(new FormControl(null,[Validators.required]));
  }
  
  addTopic(){
    this.topicSet.push(new FormControl(null,[Validators.required]));
  }
  
  deleteOption(index:number){
      this.optionSet.removeAt(index)
  }

  deleteTopic(index:number){
      this.topicSet.removeAt(index)
  }

  openQuestion(){
    this.visible = true;
  }

  searchQuestion(event:any){
    this.searchValue = event.target.value
    this.getAllQuestions(0,5)
    this.paginator.first = 0
  }

  paginationHandler(event:any){
    this.getAllQuestions(event.first,event.rows)
  }
  
  openSelectQuestion(){
    this.getAllQuestions(0,5)
    this.selectQuestion = true;
  }

  getAllQuestions(first:number,rows:number){
    this.createTestService.getAllQuestions(first,rows,this.topicValue,this.searchValue).subscribe(response=>{
      this.questions = response
      this.totalRecords = (response && response.length>0)?response[0]['total_records']:0;
    },(err)=>{
      if(err.status === 404){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not found' })
      }else if(err.status === 400){
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
      }
    })
  }

  removeQuestion(index:number){
    this.questionsList.splice(index,1)
    this.questionsIdList.splice(index,1)
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question removed successfully!' })
  }

  addQuestion(question:any){
    console.log(question)
    if(this.questionsIdList.indexOf(question.question_id) === -1){
      this.questionsList.push(question)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question added to test!' })
      this.questionsIdList.push(question.question_id)
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Question already exists in this test!' })
    }

  }

  changeFilter(event:any){
    this.topicValue = event.value
    this.getAllQuestions(0,5)
    this.paginator.first = 0
  }

  submitForm(){
    this.form.markAllAsTouched()
    this.form.markAsDirty()
    if(this.form.valid){
      this.createTestService.createQuestion(this.form.value).subscribe(response=>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question added successfully!' })
        this.visible = false;
        this.form.reset()
        this.form.patchValue({ created_by:this.faculty_id,difficulty_level:'easy' })
      })
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all the required fields' })
    }
  }

  submitTest(){
    this.testForm.markAllAsTouched()
    this.testForm.markAsDirty()
    if(this.testForm.valid && this.questionsIdList.length > 0){
      if(this.editId){
        let addedQuestions:any = []
        let removedQuestions:any = []
        this.questionsIdList.forEach((question:any) => {
          if(this.questionsBeforeUpdate.indexOf(question)===-1){
            addedQuestions.push(question)
          }
        });
        this.questionsBeforeUpdate.forEach((question:any) => {
          if(this.questionsIdList.indexOf(question)===-1){
            removedQuestions.push(question);
          }
        });

        const body = {
          ...this.testForm.value,
          test_id:this.editId,
          addedQuestions,
          removedQuestions
        }
        this.createTestService.updateTest(body).subscribe(response=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Test updated successfully!' })
        },(err)=>{
          if(err.status === 400){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
          }
        })
      }else{
        const body = {
          ...this.testForm.value,
          questions:this.questionsIdList,
          branch_id: JSON.parse(localStorage.getItem('userInfo')||'{}').branch,
        }
        this.createTestService.createTest(body).subscribe(response=>{
          this.router.navigate(['edit-test',response['insertId']])
          setTimeout(()=>{
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Test added successfully!' })
          },50)
        },(err)=>{
          if(err.status === 400){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bad Request' })
          }
          else{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Internal Server Error' })
          }
        })
      }
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all the required fields' })
    }
  }
  
}
